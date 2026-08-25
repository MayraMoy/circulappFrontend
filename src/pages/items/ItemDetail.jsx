// frontend/src/pages/ItemDetail.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import API from '../../services/Api';
import AuthContext from '../../contexts/AuthContext';
import RateUserModal from '../funcionalidades/RateUserModal';
import ConfirmModal from '../../components/feedback/ConfirmModal';
import {
  ArrowLeftIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  StarIcon,
  TagIcon,
  UserCircleIcon,
  CheckBadgeIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const cleanPhone = (phone) => phone.replace(/\D/g, '');

const categoryNames = {
  plastico:    'Plástico',
  papel:       'Papel y Cartón',
  vidrio:      'Vidrio',
  metal:       'Metal',
  textil:      'Textil',
  electronico: 'Electrónico',
  otro:        'Otro',
};

const processingStates = {
  sin_procesar: { label: 'Sin procesar', color: 'bg-gray-100 text-gray-600' },
  en_proceso:   { label: 'En proceso',   color: 'bg-amber-100 text-amber-700' },
  fardado:      { label: 'Fardado',      color: 'bg-blue-100 text-blue-700' },
  validado:     { label: 'Validado',     color: 'bg-green-100 text-green-700' },
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRateModal, setShowRateModal] = useState(false);

  // Estados para procesar/fardar
  const [processing, setProcessing] = useState(false);
  const [confirmBaleModal, setConfirmBaleModal] = useState(false);

  // Estados para editar ítem
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: '', description: '', category: '', address: '', keepImages: [], newFiles: [] });
  const [savingEdit, setSavingEdit] = useState(false);

  // Estado para eliminar ítem
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchItem = async () => {
    try {
      const res = await API.get(`/items/${id}`);
      setItem(res.data);
    } catch (err) {
      setError('No se pudo cargar el material.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchItem();
  }, [id]);

  const handleBale = async () => {
    setProcessing(true);
    try {
      await API.patch(`/items/${item._id}/bale`);
      await fetchItem();
    } catch (err) {
      alert('Error al fardar material: ' + (err.response?.data?.msg || 'Error desconocido'));
    } finally {
      setProcessing(false);
      setConfirmBaleModal(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await API.delete(`/items/${item._id}`);
      navigate('/dashboard');
    } catch (err) {
      alert('Error al eliminar: ' + (err.response?.data?.msg || 'Error desconocido'));
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const handleOpenEdit = () => {
    setEditData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'plastico',
      address: item.address || '',
      keepImages: item.images || [],
      newFiles: []
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSavingEdit(true);
    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('description', editData.description);
      formData.append('category', editData.category);
      formData.append('address', editData.address);

      if (editData.keepImages && editData.keepImages.length > 0) {
        editData.keepImages.forEach(img => formData.append('keepImages', img));
      } else {
        formData.append('keepImages', '');
      }

      if (editData.newFiles && editData.newFiles.length > 0) {
        editData.newFiles.forEach(file => formData.append('images', file));
      }

      const res = await API.put(`/items/${item._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setItem(res.data);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error al guardar cambios.');
    } finally {
      setSavingEdit(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-20 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Cargando material...</p>
        </div>
      </Layout>
    );
  }

  if (error || !item) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-20 text-center">
          <p className="text-red-500 mb-4">{error || 'Material no encontrado.'}</p>
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Volver a la búsqueda
          </button>
        </div>
      </Layout>
    );
  }

  const isOwner = user && item.ownerId?._id === user.id;
  const isGestorOrAdmin = user && (user.role === 'gestor' || user.role === 'admin' || user.role === 'dev' || user.isDev);
  const isAdminOrDev = user && (user.role === 'admin' || user.role === 'dev' || user.isDev);
  const state = processingStates[item.processingState] || { label: item.processingState, color: 'bg-gray-100 text-gray-600' };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back + Action Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Volver
          </button>

          {/* Botones de Administrador / Dueño */}
          {(isAdminOrDev || isOwner) && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenEdit}
                className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Editar
              </button>

              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
              >
                <TrashIcon className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          )}
        </div>

        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-1">
              {item.title}
            </h1>
            <p className="text-sm text-gray-500">
              {item.description || 'Sin descripción.'}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${state.color}`}>
              {state.label}
            </span>

            {/* BOTÓN DE APROBACIÓN / FARDADO PARA GESTOR O ADMIN */}
            {isGestorOrAdmin && (
              <>
                {['sin_procesar', 'en_proceso'].includes(item.processingState) && (
                  <button
                    type="button"
                    onClick={() => setConfirmBaleModal(true)}
                    disabled={processing}
                    className="bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <i className="bi bi-box-seam"></i>
                    Marcar Fardado
                  </button>
                )}

                {item.processingState === 'fardado' && (
                  <button
                    type="button"
                    onClick={() => navigate(`/validate?itemId=${item._id}`)}
                    className="bg-primary hover:bg-primary-dark active:scale-[0.98] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <i className="bi bi-patch-check"></i>
                    Validar Material
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Image gallery */}
        {item.images?.length > 0 && (
          <div className="mb-6">
            <div
              className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-2 cursor-zoom-in shadow-inner"
              onClick={() => setSelectedImage(item.images[0])}
            >
              <img
                src={item.images[0]}
                alt="Foto principal"
                className="w-full h-full object-cover"
              />
            </div>
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.slice(1).map((url, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(url)}
                  >
                    <img src={url} alt={`Foto ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-4">
          <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
            <div className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Categoría</p>
              <div className="flex items-center gap-2">
                <TagIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 font-medium">
                  {categoryNames[item.category] || item.category}
                </span>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Ofertante</p>
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-800 font-medium">
                  {item.ownerId?.name || 'Usuario'}
                </span>
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Ubicación</p>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  {item.address || (item.location ? `${item.location.lat?.toFixed(4)}, ${item.location.lng?.toFixed(4)}` : 'Sin dirección')}
                </span>
              </div>
              {item.location?.lat && (
                <a
                  href={`https://www.google.com/maps?q=${item.location.lat},${item.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-800 font-medium transition-colors"
                >
                  Ver mapa
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {!isOwner && (
          <div className="flex flex-col sm:flex-row gap-3">
            {item.ownerId?.phone && (
              <a
                href={`https://wa.me/${cleanPhone(item.ownerId.phone)}?text=Hola%20${encodeURIComponent(item.ownerId.name)},%20vi%20tu%20publicación%20"${encodeURIComponent(item.title)}"%20en%20CirculApp%20y%20me%20interesa.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white text-sm font-medium px-5 py-3 rounded-xl transition-all duration-150"
              >
                <i className="bi bi-whatsapp text-lg"></i>
                Contactar por WhatsApp
              </a>
            )}

            {user && (
              <button
                onClick={() => setShowRateModal(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] text-gray-700 text-sm font-medium px-5 py-3 rounded-xl transition-all duration-150"
              >
                <StarIcon className="w-4 h-4 text-amber-400" />
                Calificar al ofertante
              </button>
            )}
          </div>
        )}

        {/* Validated badge */}
        {item.processingState === 'validado' && (
          <div className="mt-4 flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckBadgeIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800">
              Este material fue <span className="font-medium">validado</span> por un operador de la Comuna.
            </p>
          </div>
        )}

        {/* Image modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
            <img
              src={selectedImage}
              alt="Ampliada"
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Rate User Modal */}
        {showRateModal && item?.ownerId && (
          <RateUserModal
            itemId={item._id}
            ownerName={item.ownerId.name}
            onClose={() => setShowRateModal(false)}
          />
        )}

        {/* MODAL CONFIRMACIÓN DE FARDADO */}
        <ConfirmModal
          isOpen={confirmBaleModal}
          title="Confirmar Fardado de Material"
          message="¿Deseas marcar este material como fardado para pasarlo a la etapa de validación?"
          confirmText="Marcar como Fardado"
          cancelText="Cancelar"
          type="success"
          onConfirm={handleBale}
          onCancel={() => setConfirmBaleModal(false)}
        />

        {/* MODAL CONFIRMACIÓN DE ELIMINAR */}
        <ConfirmModal
          isOpen={confirmDelete}
          title="Eliminar Publicación"
          message="¿Estás seguro de que deseas eliminar permanentemente esta publicación? Esta acción no se puede deshacer."
          confirmText={deleting ? 'Eliminando...' : 'Sí, Eliminar'}
          cancelText="Cancelar"
          type="danger"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />

        {/* MODAL EDICIÓN DE PUBLICACIÓN */}
        {isEditing && (
          <div 
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
              alignItems: 'center', justifyContent: 'center', padding: '16px'
            }}
          >
            <div style={{ background: '#FFF', borderRadius: '18px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <div style={{ background: 'linear-gradient(135deg, #0f4c38, #16A085)', padding: '16px 20px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>Editar Publicación</h3>
                <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleSaveEdit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Título</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                    value={editData.title}
                    onChange={e => setEditData({ ...editData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Categoría</label>
                  <select
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                    value={editData.category}
                    onChange={e => setEditData({ ...editData, category: e.target.value })}
                  >
                    {Object.entries(categoryNames).map(([catId, catName]) => (
                      <option key={catId} value={catId}>{catName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Descripción</label>
                  <textarea
                    rows="3"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                    value={editData.description}
                    onChange={e => setEditData({ ...editData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Dirección</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                    value={editData.address}
                    onChange={e => setEditData({ ...editData, address: e.target.value })}
                  />
                </div>

                {/* GESTIÓN DE FOTOS */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Imágenes Actuales</label>
                  {editData.keepImages?.length > 0 ? (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      {editData.keepImages.map((imgUrl, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                          <img src={imgUrl} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            type="button"
                            onClick={() => setEditData({ ...editData, keepImages: editData.keepImages.filter((_, i) => i !== idx) })}
                            style={{
                              position: 'absolute', top: '2px', right: '2px', background: 'rgba(220,38,38,0.85)',
                              color: '#FFF', border: 'none', borderRadius: '50%', width: '18px', height: '18px',
                              fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                            }}
                            title="Quitar foto"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 8px' }}>No hay imágenes conservadas.</p>
                  )}

                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Agregar Nuevas Imágenes</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setEditData({ ...editData, newFiles: Array.from(e.target.files) })}
                    style={{ fontSize: '12px' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" className="footer-btn secondary" style={{ width: 'auto', padding: '8px 18px' }} onClick={() => setIsEditing(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="publish-cta" disabled={savingEdit}>
                    {savingEdit ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default ItemDetail;