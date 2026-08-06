import {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback
} from 'react';

import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Layout from '../../components/layout/Layout';
import API from '../../services/Api';

const categories = [
  { id: 'plastico',    name: 'Plástico',       icon: 'recycle' },
  { id: 'papel',       name: 'Papel y Cartón',  icon: 'file-text' },
  { id: 'vidrio',      name: 'Vidrio',          icon: 'glass' },
  { id: 'metal',       name: 'Metal',           icon: 'tool' },
  { id: 'textil',      name: 'Textil',          icon: 'shirt' },
  { id: 'electronico', name: 'Electrónico',     icon: 'device-laptop' },
  { id: 'otro',        name: 'Otro',            icon: 'box' }
];

const PublishItem = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '', description: '', category: 'plastico',
    address: '', lat: null, lng: null
  });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && !user.phone) {
      alert('Debes completar tu número de teléfono en el perfil para publicar.');
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const geocodeAddress = useCallback(async (address) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon), formattedAddress: display_name };
      }
      return null;
    } catch { return null; }
  }, []);

  const reverseGeocode = useCallback(async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=es`);
      const data = await res.json();
      if (data.display_name) return { lat: parseFloat(lat), lng: parseFloat(lng), formattedAddress: data.display_name };
      return null;
    } catch { return null; }
  }, []);

  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setFormData(prev => ({ ...prev, address }));
    if (address.trim().length > 5) {
      setIsGeocoding(true); setError('');
      const result = await geocodeAddress(address);
      if (result) {
        setFormData(prev => ({ ...prev, lat: result.lat, lng: result.lng, address: result.formattedAddress }));
      } else {
        setError('No se encontró la dirección.');
        setFormData(prev => ({ ...prev, lat: null, lng: null }));
      }
      setIsGeocoding(false);
    } else {
      setFormData(prev => ({ ...prev, lat: null, lng: null }));
    }
  };

  const getLocation = async () => {
    if (!navigator.geolocation) { setError('Tu navegador no soporta geolocalización.'); return; }
    setError('');
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 })
      );
      const { latitude, longitude } = position.coords;
      const result = await reverseGeocode(latitude, longitude);
      if (result) {
        setFormData(prev => ({ ...prev, lat: result.lat, lng: result.lng, address: result.formattedAddress }));
      } else {
        setFormData(prev => ({ ...prev, lat: latitude, lng: longitude, address: `Ubicación GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
      }
    } catch (err) {
      setError(err.code === 1 ? 'Permiso de ubicación denegado.' : 'No se pudo obtener tu ubicación.');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    if (files.length + images.length > 5) { alert('Máximo 5 imágenes permitidas.'); return; }
    setImages(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return setError('El título es obligatorio.');
    if (!formData.lat || !formData.lng) return setError('Debes ingresar una dirección válida.');
    if (!user.phone) { alert('Debes completar tu número de teléfono en el perfil para publicar.'); navigate('/profile'); return; }

    setSubmitting(true);
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    fd.append('category', formData.category);
    fd.append('lat', formData.lat);
    fd.append('lng', formData.lng);
    images.forEach(file => fd.append('images', file));

    try {
      await API.post('/items', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/dashboard');
    } catch (err) {
      setError('Error al publicar: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCat = categories.find(c => c.id === formData.category);

  return (
    <Layout>
      <style>{`
        .pi-wrap { max-width: 680px; margin: 0 auto; padding: 0 16px; }

        .pi-back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 14px; font-weight: 500; color: var(--color-text-secondary);
          background: none; border: none; cursor: pointer; padding: 0;
          transition: color 0.15s; margin-bottom: 14px;
        }
        .pi-back-btn:hover { color: var(--color-text-primary); }

        .pi-hero {
          background: #0F6E56; border-radius: 16px;
          padding: 24px 32px; margin-bottom: 12px; position: relative; overflow: hidden;
        }
        .pi-hero::before {
          content: ''; position: absolute; top: -50px; right: -50px;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(255,255,255,0.05); pointer-events: none;
        }
        .pi-hero-eyebrow {
          font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: #9FE1CB; margin-bottom: 10px;
        }
        .pi-hero h1 { font-size: 26px; font-weight: 600; color: #fff; margin: 0 0 6px; line-height: 1.2; }
        .pi-hero p { font-size: 14px; color: rgba(255,255,255,0.65); margin: 0; }

        .pi-card {
          background: var(--color-background-primary);
          border: 0.5px solid var(--color-border-tertiary);
          border-radius: 16px; padding: 24px 28px; margin-bottom: 10px;
        }

        .pi-section-label {
          font-size: 11px; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--color-text-tertiary);
          margin-bottom: 14px; padding-bottom: 10px;
          border-bottom: 0.5px solid var(--color-border-tertiary);
        }

        .pi-field { margin-bottom: 14px; }
        .pi-field:last-child { margin-bottom: 0; }

        .pi-label {
          display: block; font-size: 13px; font-weight: 500;
          color: var(--color-text-primary); margin-bottom: 7px;
        }
        .pi-label span {
          color: #1D9E75; margin-left: 2px;
        }
        .pi-hint {
          font-size: 12px; color: var(--color-text-tertiary);
          margin-top: 5px;
        }

        .pi-input, .pi-select, .pi-textarea {
          width: 100%; box-sizing: border-box;
          padding: 10px 14px; font-size: 14px;
          border: 1.5px solid #C4C4BC;
          border-radius: 8px;
          background: var(--color-background-primary);
          color: var(--color-text-primary); outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: inherit;
        }
        .pi-input::placeholder, .pi-textarea::placeholder { color: var(--color-text-tertiary); }
        .pi-input:focus, .pi-select:focus, .pi-textarea:focus {
          border-color: #1D9E75;
          box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
        }
        .pi-textarea { resize: vertical; min-height: 90px; line-height: 1.5; }

        .pi-select-wrap { position: relative; }
        .pi-select-wrap::after {
          content: ''; position: absolute; right: 13px; top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-left: 4px solid transparent; border-right: 4px solid transparent;
          border-top: 5px solid var(--color-text-secondary);
          pointer-events: none;
        }
        .pi-select { appearance: none; -webkit-appearance: none; cursor: pointer; }

        .pi-cat-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(88px, 1fr)); gap: 8px;
        }
        .pi-cat-btn {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 12px 8px; border-radius: 10px; cursor: pointer;
          border: 1.5px solid #C4C4BC;
          background: var(--color-background-primary);
          transition: border-color 0.15s, background 0.15s;
          font-size: 12px; font-weight: 500; color: var(--color-text-secondary);
          text-align: center; line-height: 1.3;
        }
        .pi-cat-btn i { font-size: 20px; }
        .pi-cat-btn:hover { border-color: #1D9E75; color: var(--color-text-primary); }
        .pi-cat-btn.active {
          border-color: #1D9E75; background: #E1F5EE; color: #0F6E56;
        }

        .pi-address-row { display: flex; gap: 8px; }
        .pi-address-row .pi-input { flex: 1; }
        .pi-gps-btn {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px;
          padding: 10px 14px; font-size: 13px; font-weight: 500;
          border: 1.5px solid #C4C4BC; border-radius: 8px;
          background: var(--color-background-primary);
          color: var(--color-text-secondary); cursor: pointer;
          transition: border-color 0.15s, color 0.15s; white-space: nowrap;
        }
        .pi-gps-btn:hover { border-color: #1D9E75; color: #0F6E56; }

        .pi-location-chip {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 7px; padding: 5px 10px; border-radius: 20px;
          background: #E1F5EE; color: #0F6E56; font-size: 12px; font-weight: 500;
        }

        .pi-geocoding {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 7px; font-size: 12px; color: var(--color-text-secondary);
        }
        .pi-geocoding-dot {
          width: 14px; height: 14px; border: 2px solid #1D9E75;
          border-top-color: transparent; border-radius: 50%;
          animation: pi-spin 0.7s linear infinite; flex-shrink: 0;
        }
        @keyframes pi-spin { to { transform: rotate(360deg); } }

        .pi-dropzone {
          border: 1.5px dashed #C4C4BC; border-radius: 10px;
          padding: 24px; text-align: center; cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          background: var(--color-background-secondary);
        }
        .pi-dropzone:hover { border-color: #1D9E75; background: #E1F5EE; }
        .pi-dropzone-icon { font-size: 28px; color: var(--color-text-tertiary); margin-bottom: 8px; }
        .pi-dropzone p { font-size: 13px; color: var(--color-text-secondary); margin: 0; }
        .pi-dropzone span { font-size: 12px; color: var(--color-text-tertiary); }

        .pi-image-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
        .pi-image-thumb {
          position: relative; width: 76px; height: 76px; border-radius: 8px; overflow: hidden;
          border: 1.5px solid #C4C4BC;
        }
        .pi-image-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pi-remove-img {
          position: absolute; top: 3px; right: 3px;
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(0,0,0,0.65); color: #fff;
          border: none; cursor: pointer; font-size: 12px;
          display: flex; align-items: center; justify-content: center;
          line-height: 1; transition: background 0.15s;
        }
        .pi-remove-img:hover { background: #A32D2D; }

        .pi-error {
          display: flex; align-items: flex-start; gap: 10px;
          background: #FCEBEB; border: 0.5px solid #F09595;
          color: #791F1F; border-radius: 10px;
          padding: 12px 16px; font-size: 13px; margin-bottom: 20px;
        }
        .pi-error i { flex-shrink: 0; margin-top: 1px; }

        .pi-submit-btn {
          width: 100%; padding: 13px; font-size: 15px; font-weight: 500;
          background: #0F6E56; color: #fff; border: none; border-radius: 10px;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.15s, transform 0.1s;
        }
        .pi-submit-btn:hover:not(:disabled) { background: #085041; }
        .pi-submit-btn:active:not(:disabled) { transform: scale(0.99); }
        .pi-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .pi-submit-spinner {
          width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: pi-spin 0.7s linear infinite;
        }
      `}</style>

      <div className="pi-wrap">

        <div className="pi-hero">
          <p className="pi-hero-eyebrow">Marketplace de reciclables</p>
          <h1>Publicar material</h1>
          <p>Completá los datos para que otros puedan encontrar y contactarte</p>
        </div>

        {error && (
          <div className="pi-error">
            <i className="ti ti-alert-circle" style={{ fontSize: 16 }} aria-hidden="true" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Sección 1 — Info básica */}
          <div className="pi-card">
            <p className="pi-section-label">Información básica</p>

            <div className="pi-field">
              <label className="pi-label">
                Título <span>*</span>
              </label>
              <input
                type="text"
                name="title"
                className="pi-input"
                placeholder="Ej: Botellas PET limpias, 20 kg"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pi-field">
              <label className="pi-label">Descripción</label>
              <textarea
                name="description"
                className="pi-textarea"
                rows="3"
                placeholder="Contá más detalles: cantidad, estado, condiciones de retiro..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Sección 2 — Categoría */}
          <div className="pi-card">
            <p className="pi-section-label">Categoría del material</p>
            <div className="pi-cat-grid">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className={`pi-cat-btn${formData.category === cat.id ? ' active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                >
                  <i className={`ti ti-${cat.icon}`} aria-hidden="true" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sección 3 — Ubicación */}
          <div className="pi-card">
            <p className="pi-section-label">Ubicación</p>

            <div className="pi-field">
              <label className="pi-label">
                Dirección <span>*</span>
              </label>
              <div className="pi-address-row">
                <input
                  type="text"
                  className="pi-input"
                  placeholder="Ej: Av. Rivadavia 1234, Buenos Aires"
                  value={formData.address}
                  onChange={handleAddressChange}
                />
                <button type="button" className="pi-gps-btn" onClick={getLocation}>
                  <i className="ti ti-current-location" style={{ fontSize: 16 }} aria-hidden="true" />
                  Mi ubicación
                </button>
              </div>

              {isGeocoding && (
                <div className="pi-geocoding">
                  <span className="pi-geocoding-dot" />
                  Buscando dirección…
                </div>
              )}

              {formData.lat && !isGeocoding && (
                <div className="pi-location-chip">
                  <i className="ti ti-map-pin" style={{ fontSize: 13 }} aria-hidden="true" />
                  {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
                </div>
              )}
            </div>
          </div>

          {/* Sección 4 — Fotos */}
          <div className="pi-card">
            <p className="pi-section-label">Fotos del material</p>

            <div
              className="pi-dropzone"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="pi-dropzone-icon">
                <i className="ti ti-photo-up" aria-hidden="true" />
              </div>
              <p>Hacé clic para agregar fotos</p>
              <span>Hasta 5 imágenes · JPG, PNG, WEBP</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

            {previewUrls.length > 0 && (
              <div className="pi-image-grid">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="pi-image-thumb">
                    <img src={url} alt={`preview ${idx}`} />
                    <button
                      type="button"
                      className="pi-remove-img"
                      onClick={() => removeImage(idx)}
                      aria-label="Eliminar imagen"
                    >
                      <i className="ti ti-x" style={{ fontSize: 11 }} aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {previewUrls.length < 5 && (
                  <button
                    type="button"
                    className="pi-image-thumb"
                    style={{
                      background: 'var(--color-background-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', border: '1.5px dashed #C4C4BC'
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="ti ti-plus" style={{ fontSize: 22, color: 'var(--color-text-tertiary)' }} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            <p className="pi-hint">{previewUrls.length}/5 imágenes seleccionadas</p>
          </div>

          <button type="submit" className="pi-submit-btn" disabled={submitting}>
            {submitting ? (
              <><span className="pi-submit-spinner" /> Publicando…</>
            ) : (
              <><i className="ti ti-circle-check" style={{ fontSize: 18 }} aria-hidden="true" /> Publicar material</>
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PublishItem;