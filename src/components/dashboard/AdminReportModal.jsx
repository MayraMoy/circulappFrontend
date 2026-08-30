import { useState, useEffect } from 'react';
import API from '../../services/Api';
import { 
  DocumentChartBarIcon, 
  ArrowDownTrayIcon, 
  XMarkIcon,
  CheckBadgeIcon,
  SparklesIcon,
  CalendarDaysIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

export default function AdminReportModal({ isOpen, onClose, reportInfo }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !reportInfo?.endpoint) return;

    const fetchReportData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const res = await API.get(`${reportInfo.endpoint}?format=json`);
        setData(res.data);
      } catch (err) {
        console.error('Error al obtener datos del reporte:', err);
        setError('No se pudieron cargar los datos del reporte.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [isOpen, reportInfo]);

  if (!isOpen || !reportInfo) return null;

  const handleDownloadExcel = async () => {
    setExportingExcel(true);
    try {
      const response = await API.get(`${reportInfo.endpoint}?format=xlsx`, {
        responseType: 'blob'
      });
      const filename = `reporte_${reportInfo.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al exportar Excel:', err);
      alert('Error al generar el archivo Excel.');
    } finally {
      setExportingExcel(false);
    }
  };

  const handleDownloadJSON = () => {
    if (!data) return;
    const filename = `reporte_${reportInfo.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const reportType = reportInfo.endpoint.split('/').pop();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F6E56] to-[#16a085] px-6 py-5 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <DocumentChartBarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-100 mb-0.5">
                <BuildingOffice2Icon className="w-3.5 h-3.5" />
                Informe Oficial Comunal
              </div>
              <h3 className="text-lg font-bold m-0 leading-tight">{reportInfo.title}</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border-0 cursor-pointer transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <span className="inline-block w-8 h-8 rounded-full border-3 border-[#0F6E56] border-t-transparent animate-spin mb-3" />
              <p className="text-sm font-semibold text-gray-700">Generando reporte comunal en tiempo real...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center text-rose-600 bg-rose-50 rounded-2xl border border-rose-200 p-6">
              <p className="font-bold text-sm m-0 mb-1">{error}</p>
              <button
                onClick={() => onClose()}
                className="mt-3 px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          ) : data ? (
            <div className="flex flex-col gap-6">
              
              {/* Meta info bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDaysIcon className="w-4 h-4 text-[#0F6E56]" />
                  <span>Generado: <strong>{new Date(data.generatedAt || Date.now()).toLocaleDateString('es-AR')} {new Date(data.generatedAt || Date.now()).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs</strong></span>
                </div>
                {data.period && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    Período: {data.period}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] inline-flex items-center gap-1">
                  <CheckBadgeIcon className="w-3.5 h-3.5" />
                  Datos Certificados
                </span>
              </div>

              {/* REPORTE MENSUAL VIEW */}
              {reportType === 'monthly' && data.metrics && (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 m-0">Usuarios</p>
                      <p className="text-2xl font-bold text-emerald-950 mt-1 m-0">{data.metrics.totalUsers}</p>
                      <span className="text-[10px] text-emerald-700 font-medium">Registrados</span>
                    </div>

                    <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 m-0">Materiales</p>
                      <p className="text-2xl font-bold text-amber-950 mt-1 m-0">{data.metrics.totalItems}</p>
                      <span className="text-[10px] text-amber-700 font-medium">Publicados</span>
                    </div>

                    <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800 m-0">Validados</p>
                      <p className="text-2xl font-bold text-blue-950 mt-1 m-0">{data.metrics.validatedItems}</p>
                      <span className="text-[10px] text-blue-700 font-medium">Certificados</span>
                    </div>

                    <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-purple-800 m-0">Efectividad</p>
                      <p className="text-2xl font-bold text-purple-950 mt-1 m-0">{data.metrics.activityRate}</p>
                      <span className="text-[10px] text-purple-700 font-medium">Tasa de valorización</span>
                    </div>
                  </div>

                  {/* Tabla de categorías */}
                  {data.itemsByCategory && data.itemsByCategory.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-200 font-bold text-xs text-gray-700">
                        Distribución por Categoría de Residuo
                      </div>
                      <div className="divide-y divide-gray-100">
                        {data.itemsByCategory.map((cat) => (
                          <div key={cat._id} className="flex items-center justify-between px-4 py-2.5 text-xs">
                            <span className="font-semibold text-gray-800 capitalize">{cat._id || 'Sin categoría'}</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 font-bold text-gray-700">
                              {cat.count} publicaciones
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* REPORTE AMBIENTAL VIEW */}
              {reportType === 'environmental' && data.metrics && (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 m-0">CO₂ Evitado</p>
                        <p className="text-3xl font-extrabold text-emerald-900 mt-1 m-0">{data.metrics.co2SavedKg} kg</p>
                      </div>
                      <p className="text-[11px] text-emerald-700 mt-2 m-0 font-medium">
                        Reducción de huella de carbono comunal
                      </p>
                    </div>

                    <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-teal-800 m-0">Árboles Equivalentes</p>
                        <p className="text-3xl font-extrabold text-teal-900 mt-1 m-0">{data.metrics.treesEquivalent}</p>
                      </div>
                      <p className="text-[11px] text-teal-700 mt-2 m-0 font-medium">
                        Capacidad de absorción biológica anual
                      </p>
                    </div>

                    <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-sky-800 m-0">Ahorro Hídrico</p>
                        <p className="text-3xl font-extrabold text-sky-900 mt-1 m-0">{data.metrics.waterSavedLiters || data.metrics.totalMaterialsRecycled * 150} L</p>
                      </div>
                      <p className="text-[11px] text-sky-700 mt-2 m-0 font-medium">
                        Litros de agua preservados
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-900 text-white rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center">
                        <SparklesIcon className="w-6 h-6 text-emerald-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold m-0">Índice de Eficiencia de Economía Circular</h4>
                        <p className="text-xs text-emerald-200 m-0 mt-0.5">Certificación Comunal Sustentable</p>
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-400 text-emerald-950 font-black text-lg tracking-wider">
                      {data.metrics.cleanEnergyScore || 'A+'}
                    </span>
                  </div>
                </div>
              )}

              {/* REPORTE VALIDACIONES VIEW */}
              {reportType === 'validations' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <span className="text-xs font-bold text-emerald-900">Total de Fardos Certificados Comunalmente:</span>
                    <span className="text-xl font-extrabold text-emerald-800">{data.totalValidated || data.items?.length || 0}</span>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto max-h-64">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider sticky top-0 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-2.5">Material</th>
                            <th className="px-4 py-2.5">Categoría</th>
                            <th className="px-4 py-2.5">Ofertante</th>
                            <th className="px-4 py-2.5">Validado Por</th>
                            <th className="px-4 py-2.5">Fecha</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {data.items?.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50/60">
                              <td className="px-4 py-2.5 font-bold text-gray-800">{item.title}</td>
                              <td className="px-4 py-2.5 text-gray-600 capitalize">{item.category}</td>
                              <td className="px-4 py-2.5 text-gray-700">{item.ownerId?.name || '—'}</td>
                              <td className="px-4 py-2.5 text-emerald-700 font-medium">{item.validatedBy?.name || 'Gestor'}</td>
                              <td className="px-4 py-2.5 text-gray-500">
                                {new Date(item.validationDate || item.createdAt).toLocaleDateString('es-AR')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : null}
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-200 border border-gray-300 transition-colors cursor-pointer"
          >
            Cerrar
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadJSON}
              disabled={!data || loading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <ArrowDownTrayIcon className="w-3.5 h-3.5" />
              Descargar JSON
            </button>

            <button
              type="button"
              onClick={handleDownloadExcel}
              disabled={!data || loading || exportingExcel}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0F6E56] hover:bg-[#0c5945] active:scale-95 transition-all shadow-sm cursor-pointer inline-flex items-center gap-2 disabled:opacity-60"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              {exportingExcel ? 'Generando Excel...' : 'Exportar a Excel (.xlsx)'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
