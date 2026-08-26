import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from "../../components/layout/Layout";
import API from "../../services/Api";
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
  const [itemId, setItemId]           = useState('');
  const [checklist, setChecklist]     = useState([]);
  const [observations, setObservations] = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('itemId');
    if (id) setItemId(id);
    else setError('No se proporcionó un ID de fardo válido.');
  }, [location]);

  const toggleCheck = (id) => {
    setChecklist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checklist.length !== checklistItems.length) {
      setError('Debes completar todos los ítems del checklist.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await API.post('/validation/validate', { itemId, checklist, observations });
      alert('Material validado exitosamente.');
      navigate('/dashboard');
    } catch (err) {
      setError('Error: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    } finally {
      setLoading(false);
    }
  };

  const progress = checklist.length / checklistItems.length;
  const allChecked = checklist.length === checklistItems.length;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 leading-snug">
              Validar material fardado
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Verifica que el material cumpla con la metodología estandarizada de la Comuna.
            </p>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg px-4 py-3 mb-4">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.007v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {/* Card */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

          {/* ID del fardo */}
          <div className="px-6 py-5 border-b border-gray-100">
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              ID del fardo o publicación
            </label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <TagIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />
              <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                {itemId || 'sin ID'}
              </span>
            </div>
          </div>

          {/* Checklist */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400">
                Checklist de validación <span className="text-red-400 normal-case tracking-normal">*</span>
              </label>
              <span className="text-xs text-gray-400 font-medium">
                {checklist.length} / {checklistItems.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-2">
              {checklistItems.map((item) => {
                const isChecked = checklist.includes(item.id);
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 w-full
                      ${isChecked
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                  >
                    {/* Custom checkbox */}
                    <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150
                      ${isChecked ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}
                    >
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </span>

                    <span className={`text-sm flex-1 ${isChecked ? 'text-green-900 font-medium' : 'text-gray-700'}`}>
                      {item.label}
                    </span>

                    <span className="text-base opacity-60">
                      <item.Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Observaciones */}
          <div className="px-6 py-5 border-b border-gray-100">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Observaciones
              <span className="normal-case tracking-normal font-normal text-gray-400">(opcional)</span>
            </label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={3}
              placeholder="Ej: Falta etiqueta de peso..."
              className="w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent
                transition-all duration-150"
            />
          </div>

          {/* Footer actions */}
          <div className="px-6 py-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200
                hover:border-gray-300 px-4 py-2.5 rounded-xl transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver
            </button>

            <button
              type="submit"
              disabled={loading || !allChecked}
              className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition-all duration-150
                ${allChecked && !loading
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Validando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Certificar material
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
};

export default ValidateMaterial;