import { useState } from 'react';
import API from '../../services/Api';

const ITEM_REPORT_REASONS = [
  { id: 'contenido_inapropiado', label: 'Contenido inapropiado u ofensivo', desc: 'Lenguaje ofensivo, imágenes no aptas o discriminación.' },
  { id: 'categoria_incorrecta', label: 'Categoría incorrecta', desc: 'El material fue clasificado en un tipo de residuo erróneo.' },
  { id: 'informacion_falsa', label: 'Información falsa o engañosa', desc: 'Ubicación, fotos o descripción engañosas.' },
  { id: 'material_no_reciclable', label: 'Material no reciclable / peligroso', desc: 'Residuos tóxicos o materiales prohibidos en la plataforma.' },
  { id: 'spam_o_duplicado', label: 'Spam o publicación duplicada', desc: 'Publicación repetida o publicidad no autorizada.' },
  { id: 'contacto_invalido', label: 'Datos de contacto falsos', desc: 'El número de teléfono o datos son inválidos o fraudulentos.' },
  { id: 'otro', label: 'Otro motivo', desc: 'Cualquier otra irregularidad no contemplada arriba.' }
];

const USER_REPORT_REASONS = [
  { id: 'usuario_sospechoso', label: 'Usuario sospechoso o actividad dudosa', desc: 'Perfil con comportamientos irregulares o sospecha de bot.' },
  { id: 'comportamiento_abusivo', label: 'Comportamiento abusivo o acoso', desc: 'Amenazas, ofensas, tratos agresivos o discriminación.' },
  { id: 'estafa_o_fraude', label: 'Intento de estafa o fraude', desc: 'Publicaciones engañosas para solicitar pagos indebidos.' },
  { id: 'suplantacion_identidad', label: 'Suplantación de identidad', desc: 'Se hace pasar por otra persona, comercio o entidad comunal.' },
  { id: 'contacto_falso_o_invalido', label: 'Teléfono o contacto falso reiterado', desc: 'Contacto falso o inaccesible de forma constante.' },
  { id: 'otro', label: 'Otro motivo', desc: 'Cualquier otra conducta contraria a las normas de convivencia.' }
];

export default function ReportModal({ 
  isOpen, 
  onClose, 
  targetType = 'item', 
  itemId, 
  itemTitle, 
  reportedUserId, 
  reportedUserName 
}) {
  const isUserReport = targetType === 'user';
  const reasonsList = isUserReport ? USER_REPORT_REASONS : ITEM_REPORT_REASONS;

  const [reason, setReason] = useState(reasonsList[0].id);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const payload = {
        targetType,
        reason,
        description: description.trim()
      };

      if (isUserReport) {
        payload.reportedUserId = reportedUserId;
      } else {
        payload.itemId = itemId;
      }

      const res = await API.post('/reports', payload);

      setFeedback({
        type: 'success',
        msg: res.data.msg || (isUserReport ? 'Denuncia de usuario enviada exitosamente.' : 'Denuncia enviada correctamente.')
      });

      setTimeout(() => {
        onClose();
        setFeedback(null);
        setDescription('');
        setReason(reasonsList[0].id);
      }, 2000);
    } catch (err) {
      setFeedback({
        type: 'error',
        msg: err.response?.data?.msg || 'Error al enviar la denuncia. Intenta nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera */}
        <div className="bg-gradient-to-r from-rose-700 to-rose-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold m-0 leading-tight">
                {isUserReport ? 'Denunciar Usuario' : 'Denunciar Publicación'}
              </h3>
              <p className="text-[11px] text-rose-100 m-0 truncate max-w-[280px]">
                {isUserReport ? (reportedUserName || 'Usuario') : (itemTitle || 'Material publicado')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-white/80 hover:text-white text-lg bg-transparent border-0 cursor-pointer transition-opacity"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo / Formulario */}
        <div className="p-6">
          {feedback ? (
            <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              <span className="text-xl">
                {feedback.type === 'success' ? '✓' : '⚠'}
              </span>
              <p className="m-0 text-xs">{feedback.msg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Motivo de la denuncia
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all cursor-pointer"
                  required
                >
                  {reasonsList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-500 mt-1 italic">
                  {reasonsList.find((r) => r.id === reason)?.desc}
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Explicación o detalles adicionales (Opcional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    isUserReport 
                      ? 'Describe por qué este usuario incumple las normas de la comunidad...'
                      : 'Describe por qué esta publicación incumple las normas o qué error presenta...'
                  }
                  rows={3}
                  maxLength={1000}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none"
                />
                <p className="text-[10px] text-gray-400 text-right m-0">
                  {description.length}/1000 caracteres
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 flex items-start gap-2">
                <span className="font-bold">ℹ</span>
                <span>
                  Las denuncias son revisadas por los administradores y gestores de la Comuna. El uso indebido reiterado puede suspender tu cuenta.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 border border-gray-300 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all shadow-sm disabled:opacity-60 cursor-pointer inline-flex items-center gap-1.5"
                >
                  {loading ? 'Enviando...' : (isUserReport ? 'Reportar Usuario' : 'Confirmar Denuncia')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
