import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from "../../components/layout/Layout";
import API from "../../services/Api";
import ConfirmModal from '../../components/feedback/ConfirmModal';
import '../dashboard/Dashboard.css';
import {
  SparklesIcon,
  Square3Stack3DIcon,
  ArchiveBoxIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

const checklistItems = [
  { id: 'limpieza',     label: 'Material limpio y seco',           Icon: SparklesIcon },
  { id: 'homogeneidad', label: '100% del mismo tipo de material',  Icon: Square3Stack3DIcon },
  { id: 'compactado',   label: 'Bien compactado y atado',          Icon: ArchiveBoxIcon },
  { id: 'etiquetado',   label: 'Etiqueta con tipo y peso visible', Icon: TagIcon },
];

const ValidateMaterial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemId, setItemId] = useState('');
  const [availableFardos, setAvailableFardos] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [observations, setObservations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('itemId');
    if (id) {
      setItemId(id);
    } else {
      // Cargar fardos disponibles para seleccionar si no vino un ID en la URL
      fetchFardos();
    }
  }, [location]);

  const fetchFardos = async () => {
    try {
      const res = await API.get('/items?processingState=fardado');
      setAvailableFardos(res.data);
      if (res.data.length > 0) {
        setItemId(res.data[0]._id);
      }
    } catch (err) {
      console.error('Error al cargar fardos:', err);
    }
  };

  const toggleCheck = (id) => {
    setChecklist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemId) {
      setError('Debes seleccionar o proporcionar un ID de fardo válido.');
      return;
    }
    if (checklist.length !== checklistItems.length) {
      setError('Debes completar todos los puntos del checklist de validación.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await API.post('/validation/validate', { itemId, checklist, observations });
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al validar el fardo. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const progress = (checklist.length / checklistItems.length) * 100;
  const allChecked = checklist.length === checklistItems.length;

  return (
    <Layout>
      <div className="dashboard-wrapper">
        <div className="dashboard-inner" style={{ maxWidth: '720px' }}>

          {/* Banner de Validación */}
          <div className="hero-banner">
            <div className="hero-banner-deco" />
            <div className="hero-banner-deco-2" />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h1 className="hero-title">Validar Material Fardado</h1>
              <p className="hero-sub">
                Verifica la calidad y certifique el fardo bajo los estándares ambientales de la Comuna.
              </p>
            </div>
          </div>

          {/* Alerta de Error */}
          {error && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: '600',
                background: 'rgba(231,76,60,0.12)',
                color: '#E74C3C',
                border: '1px solid rgba(231,76,60,0.25)'
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Formulario de Validación */}
          <form onSubmit={handleSubmit} className="section-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Selección o despliegue del ID de Fardo */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Fardo a Validar
              </label>

              {availableFardos.length > 0 && !new URLSearchParams(location.search).get('itemId') ? (
                <select
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #DEE2E6',
                    fontSize: '13px',
                    fontWeight: '600',
                    outline: 'none'
                  }}
                >
                  {availableFardos.map(fardo => (
                    <option key={fardo._id} value={fardo._id}>
                      {fardo.title} — Categoría: {fardo.category} (ID: {fardo._id.substring(0, 8)}...)
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ padding: '12px 16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TagIcon style={{ width: '18px', height: '18px', color: 'var(--primary)' }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    ID: {itemId || 'Sin ID seleccionado'}
                  </span>
                </div>
              )}
            </div>

            {/* Checklist */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F3F5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  Checklist de Validación <span style={{ color: '#E74C3C' }}>*</span>
                </label>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)' }}>
                  {checklist.length} / {checklistItems.length} completados
                </span>
              </div>

              {/* Barra de progreso */}
              <div style={{ height: '6px', background: '#EAECEF', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {checklistItems.map(item => {
                  const isChecked = checklist.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: isChecked ? '1.5px solid #16A085' : '1px solid #EAECEF',
                        background: isChecked ? 'rgba(22,160,133,0.06)' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          border: isChecked ? 'none' : '2px solid #CBD5E1',
                          background: isChecked ? '#16A085' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: '700',
                          flexShrink: 0
                        }}
                      >
                        {isChecked && '✓'}
                      </div>

                      <span style={{ fontSize: '13px', fontWeight: isChecked ? '600' : '500', color: isChecked ? '#0f4c38' : 'var(--text-primary)', flex: 1 }}>
                        {item.label}
                      </span>

                      <item.Icon style={{ width: '20px', height: '20px', color: isChecked ? '#16A085' : '#94A3B8' }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Observaciones */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F3F5' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                Observaciones <span style={{ textTransform: 'none', fontWeight: 'normal', color: 'var(--text-secondary)' }}>(opcional)</span>
              </label>
              <textarea
                rows="3"
                placeholder="Ej: Material verificado en planta de transferencia, cumple normas de empaque..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #DEE2E6',
                  fontSize: '13px',
                  outline: 'none'
                }}
                value={observations}
                onChange={e => setObservations(e.target.value)}
              />
            </div>

            {/* Acciones */}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #F1F3F5' }}>
              <button
                type="button"
                className="footer-btn secondary"
                style={{ width: 'auto', padding: '12px 24px' }}
                onClick={() => navigate('/dashboard')}
              >
                Volver
              </button>

              <button
                type="submit"
                disabled={loading || !allChecked}
                className="publish-cta"
                style={{
                  flex: 1,
                  padding: '12px',
                  opacity: (!allChecked || loading) ? 0.5 : 1,
                  cursor: (!allChecked || loading) ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Certificando...' : 'Certificar y Validar Material'}
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* MODAL DE ÉXITO DE VALIDACIÓN */}
      <ConfirmModal
        isOpen={showSuccessModal}
        title="¡Material Validado!"
        message="El fardo ha sido certificado exitosamente bajo la metodología estandarizada."
        confirmText="Ir al Dashboard"
        cancelText=""
        type="success"
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate('/dashboard');
        }}
        onCancel={() => {
          setShowSuccessModal(false);
          navigate('/dashboard');
        }}
      />
    </Layout>
  );
};

export default ValidateMaterial;