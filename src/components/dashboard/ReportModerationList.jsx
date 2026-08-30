import { useState } from 'react';
import { Link } from 'react-router-dom';

const REASON_LABELS = {
  // Publicaciones
  contenido_inapropiado: { label: 'Contenido inapropiado', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  categoria_incorrecta: { label: 'Categoría incorrecta', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  informacion_falsa: { label: 'Información engañosa', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  material_no_reciclable: { label: 'Material no reciclable / peligroso', color: 'bg-red-50 text-red-700 border-red-200' },
  spam_o_duplicado: { label: 'Spam o duplicado', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  contacto_invalido: { label: 'Datos falsos', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  // Usuarios
  usuario_sospechoso: { label: 'Usuario sospechoso', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  comportamiento_abusivo: { label: 'Comportamiento abusivo', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  estafa_o_fraude: { label: 'Sospecha de estafa/fraude', color: 'bg-red-50 text-red-700 border-red-200' },
  suplantacion_identidad: { label: 'Suplantación de identidad', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  contacto_falso_o_invalido: { label: 'Contacto falso reiterado', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  // Común
  otro: { label: 'Otro motivo', color: 'bg-gray-50 text-gray-700 border-gray-200' }
};

const STATUS_BADGES = {
  pendiente: { label: 'Pendiente', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  en_revision: { label: 'En revisión', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  desestimada: { label: 'Desestimada', color: 'bg-gray-100 text-gray-600 border-gray-200' },
  publicacion_eliminada: { label: 'Publicación Eliminada', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  usuario_suspendido: { label: 'Usuario Desactivado', color: 'bg-rose-50 text-rose-700 border-rose-200' }
};

export default function ReportModerationList({
  reports,
  loading,
  onDismiss,
  onDeleteItem,
  onDeactivateUser,
  actionLoadingId
}) {
  const [filter, setFilter] = useState('todas'); // 'todas' | 'pendiente' | 'usuarios' | 'publicaciones'

  const filtered = reports.filter((r) => {
    if (filter === 'pendiente') return r.status === 'pendiente';
    if (filter === 'usuarios') return r.targetType === 'user';
    if (filter === 'publicaciones') return r.targetType !== 'user';
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filtro rápido */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-100 flex-wrap">
        <span className="text-xs text-gray-500 font-medium">Filtrar:</span>
        <button
          type="button"
          onClick={() => setFilter('todas')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
            filter === 'todas'
              ? 'bg-[#16a085]/10 text-[#0f4c38] border-[#16a085]/30'
              : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          Todas ({reports.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('pendiente')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
            filter === 'pendiente'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          Pendientes ({reports.filter((r) => r.status === 'pendiente').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('usuarios')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
            filter === 'usuarios'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          👤 Usuarios ({reports.filter((r) => r.targetType === 'user').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('publicaciones')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
            filter === 'publicaciones'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          📦 Publicaciones ({reports.filter((r) => r.targetType !== 'user').length})
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-gray-400">
          Cargando denuncias...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-xs text-gray-500 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
          <p className="font-semibold text-gray-700 m-0 mb-1">No hay denuncias en esta sección</p>
          <p className="text-[11px] text-gray-400 m-0">La comunidad se encuentra operando con normalidad.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((report) => {
            const isUserReport = report.targetType === 'user';
            const reasonInfo = REASON_LABELS[report.reason] || { label: report.reason, color: 'bg-gray-50 text-gray-700 border-gray-200' };
            const statusInfo = STATUS_BADGES[report.status] || { label: report.status, color: 'bg-gray-50 text-gray-700 border-gray-200' };
            const isPending = report.status === 'pendiente';
            const isProcessing = actionLoadingId === report._id;

            return (
              <div
                key={report._id}
                className={`p-4 rounded-xl border transition-all ${
                  isPending ? 'bg-white border-amber-200 shadow-xs' : 'bg-gray-50/70 border-gray-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Badge de tipo de objetivo */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${
                      isUserReport 
                        ? 'bg-blue-50 text-blue-800 border-blue-200' 
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {isUserReport ? '👤 Usuario' : '📦 Publicación'}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${reasonInfo.color}`}>
                      {reasonInfo.label}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-400">
                    {new Date(report.createdAt).toLocaleDateString('es-AR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {/* Elemento denunciado: Usuario o Publicación */}
                {isUserReport ? (
                  <div className="flex items-start gap-3 p-3 bg-blue-50/40 rounded-xl border border-blue-100 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {report.reportedUser?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-gray-900 m-0">
                          {report.reportedUser?.name || 'Usuario no encontrado'}
                        </h4>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-600 font-semibold">
                          Rol: {report.reportedUser?.role || 'user'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 m-0 mt-0.5 truncate">
                        {report.reportedUser?.email} {report.reportedUser?.phone ? `• ${report.reportedUser.phone}` : ''}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                      {report.item?.images?.[0] ? (
                        <img
                          src={report.item.images[0]}
                          alt={report.item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                          Sin foto
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-gray-800 m-0 truncate">
                          {report.item?.title || 'Material eliminado o no disponible'}
                        </h4>
                        {report.item?._id && (
                          <Link
                            to={`/items/${report.item._id}`}
                            className="text-[11px] font-semibold text-[#16a085] hover:underline flex-shrink-0"
                          >
                            Ver detalle ↗
                          </Link>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 m-0 mt-0.5">
                        Categoría: {report.item?.category || '—'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Explicación del denunciante */}
                {report.description && (
                  <div className="text-xs text-gray-700 bg-amber-50/50 border border-amber-100 p-2.5 rounded-lg mb-3">
                    <span className="font-semibold text-gray-900 block mb-0.5 text-[11px]">
                      Motivo explicado por el usuario:
                    </span>
                    <p className="m-0 italic">"{report.description}"</p>
                  </div>
                )}

                {/* Denunciante y Acciones */}
                <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                  <div>
                    Denunciado por: <span className="font-semibold text-gray-700">{report.reporter?.name || 'Usuario'}</span> ({report.reporter?.email || '—'})
                  </div>

                  {/* Acciones de Moderación */}
                  {isPending && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => onDismiss(report._id)}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {isProcessing ? 'Procesando...' : 'Desestimar'}
                      </button>

                      {isUserReport ? (
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => onDeactivateUser && onDeactivateUser(report._id, report.reportedUser?.name)}
                          className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer inline-flex items-center gap-1"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          Suspender Usuario
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => onDeleteItem(report._id, report.item?.title)}
                          className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer inline-flex items-center gap-1"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar Publicación
                        </button>
                      )}
                    </div>
                  )}

                  {!isPending && report.resolvedBy && (
                    <div className="text-[10px] text-gray-400">
                      Atendido por: {report.resolvedBy.name} ({statusInfo.label})
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
