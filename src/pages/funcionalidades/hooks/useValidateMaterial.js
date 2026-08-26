import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../../services/Api';
import {
  SparklesIcon,
  Square3Stack3DIcon,
  ArchiveBoxIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

export const CHECKLIST_ITEMS = [
  { id: 'limpieza', label: 'Material limpio y seco', Icon: SparklesIcon },
  { id: 'homogeneidad', label: '100% del mismo tipo de material', Icon: Square3Stack3DIcon },
  { id: 'compactado', label: 'Bien compactado y atado', Icon: ArchiveBoxIcon },
  { id: 'etiquetado', label: 'Etiqueta con tipo y peso visible', Icon: TagIcon },
];

const useValidateMaterial = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [itemId, setItemId] = useState('');
  const [availableFardos, setAvailableFardos] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [observations, setObservations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isUrlItemId = Boolean(new URLSearchParams(location.search).get('itemId'));

  const fetchFardos = useCallback(async () => {
    try {
      const res = await API.get('/items?processingState=fardado');
      setAvailableFardos(res.data);
      if (res.data.length > 0) {
        setItemId(res.data[0]._id);
      }
    } catch (err) {
      console.error('Error al cargar fardos:', err);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('itemId');
    const timeoutId = setTimeout(() => {
      if (id) {
        setItemId(id);
      } else {
        fetchFardos();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [location.search, fetchFardos]);

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
    if (checklist.length !== CHECKLIST_ITEMS.length) {
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

  const progress = (checklist.length / CHECKLIST_ITEMS.length) * 100;
  const allChecked = checklist.length === CHECKLIST_ITEMS.length;

  return {
    navigate,
    itemId,
    setItemId,
    availableFardos,
    checklist,
    observations,
    setObservations,
    loading,
    error,
    showSuccessModal,
    setShowSuccessModal,
    isUrlItemId,
    toggleCheck,
    handleSubmit,
    progress,
    allChecked
  };
};

export default useValidateMaterial;