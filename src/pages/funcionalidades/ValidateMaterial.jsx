import Layout from '../../components/layout/Layout';
import ConfirmModal from '../../components/feedback/ConfirmModal';
import { TagIcon } from '@heroicons/react/24/outline';
import useValidateMaterial, { CHECKLIST_ITEMS } from './hooks/useValidateMaterial';

const ValidateMaterial = () => {
  const {
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
  } = useValidateMaterial();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-[720px] mx-auto">

          {/* Hero Banner */}
          <div className="relative bg-gradient-to-r from-[#0f4c38] to-[#16a085] rounded-2xl p-6 mb-6 text-white overflow-hidden shadow-sm">
            <div className="relative z-10">
              <h1 className="text-xl font-bold tracking-tight m-0">Validar Material Fardado</h1>
              <p className="text-xs text-emerald-100 mt-1 m-0">
                Verifica la calidad y certifica el fardo bajo los estándares ambientales de la Comuna.
              </p>
            </div>
          </div>

          {/* Alerta de Error */}
          {error && (
            <div className="p-3.5 rounded-xl mb-4 text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Formulario Principal */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">

            {/* Selección o despliegue del ID de Fardo */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Fardo a Validar
              </label>

              {availableFardos.length > 0 && !isUrlItemId ? (
                <select
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                >
                  {availableFardos.map(fardo => (
                    <option key={fardo._id} value={fardo._id}>
                      {fardo.title} — Categoría: {fardo.category} (ID: {fardo._id.substring(0, 8)}...)
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <TagIcon className="w-4 h-4 text-[#16a085]" />
                  <span className="text-xs font-semibold text-gray-800">
                    ID: {itemId || 'Sin ID seleccionado'}
                  </span>
                </div>
              )}
            </div>

            {/* Checklist */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider m-0">
                  Checklist de Validación <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-semibold text-[#16a085]">
                  {checklist.length} / {CHECKLIST_ITEMS.length} completados
                </span>
              </div>

              {/* Barra de Progreso */}
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-[#16a085] to-[#0f4c38] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Opciones del Checklist */}
              <div className="flex flex-col gap-2.5">
                {CHECKLIST_ITEMS.map(item => {
                  const isChecked = checklist.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${
                        isChecked
                          ? 'border-[#16a085] bg-[#16a085]/5'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-[#16a085] text-white'
                            : 'border-2 border-slate-300 bg-transparent'
                        }`}
                      >
                        {isChecked && '✓'}
                      </div>

                      <span className={`text-xs flex-1 ${
                        isChecked ? 'font-semibold text-[#0f4c38]' : 'font-medium text-gray-700'
                      }`}>
                        {item.label}
                      </span>

                      <item.Icon className={`w-5 h-5 ${
                        isChecked ? 'text-[#16a085]' : 'text-slate-400'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Observaciones */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Observaciones <span className="normal-case font-normal text-gray-400">(opcional)</span>
              </label>
              <textarea
                rows="3"
                placeholder="Ej: Material verificado en planta de transferencia, cumple normas de empaque..."
                className="w-full p-3 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                value={observations}
                onChange={e => setObservations(e.target.value)}
              />
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                Volver
              </button>

              <button
                type="submit"
                disabled={loading || !allChecked}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#16a085] to-[#0f4c38] text-white text-xs font-semibold shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Certificando...' : 'Certificar y Validar Material'}
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Modal de Éxito */}
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