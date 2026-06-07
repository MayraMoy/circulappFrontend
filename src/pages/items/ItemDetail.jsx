// frontend/src/pages/ItemDetail.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import API from '../../services/Api';
import { AuthContext } from '../../contexts/AuthContext';
import RateUserModal from '../funcionalidades/RateUserModal';
import {
  ArrowLeftIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  StarIcon,
  TagIcon,
  UserCircleIcon,
  CheckBadgeIcon,
  XMarkIcon,
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
  const [item, setItem]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRateModal, setShowRateModal] = useState(false);

  useEffect(() => {
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
    if (id) fetchItem();
  }, [id]);

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
  const state   = processingStates[item.processingState] || { label: item.processingState, color: 'bg-gray-100 text-gray-600' };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver
        </button>

        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 leading-snug mb-1">
              {item.title}
            </h1>
            <p className="text-sm text-gray-500">
              {item.description || 'Sin descripción.'}
            </p>
          </div>
          <span className={`flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full ${state.color}`}>
            {state.label}
          </span>
        </div>

        {/* Image gallery */}
        {item.images?.length > 0 && (
          <div className="mb-6">
            {/* Main image */}
            <div
              className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-2 cursor-zoom-in"
              onClick={() => setSelectedImage(item.images[0])}
            >
              <img
                src={item.images[0]}
                alt="Foto principal"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
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

          {/* Categoría + Ofertante */}
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

          {/* Ubicación */}
          <div className="px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Ubicación</p>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  {item.address || `${item.location.lat.toFixed(4)}, ${item.location.lng.toFixed(4)}`}
                </span>
              </div>
              <a
                href={`https://www.google.com/maps?q=${item.location.lat},${item.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-800 font-medium transition-colors"
              >
                Ver mapa
                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!isOwner && (
          <div className="flex flex-col sm:flex-row gap-3">

            {/* WhatsApp */}
            {item.ownerId?.phone && (
              <a
                href={`https://wa.me/${cleanPhone(item.ownerId.phone)}?text=Hola%20${encodeURIComponent(item.ownerId.name)},%20vi%20tu%20publicación%20"${encodeURIComponent(item.title)}"%20en%20CirculApp%20y%20me%20interesa.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white text-sm font-medium px-5 py-3 rounded-xl transition-all duration-150"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contactar por WhatsApp
              </a>
            )}

            {/* Calificar */}
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

      </div>
    </Layout>
  );
};

export default ItemDetail;