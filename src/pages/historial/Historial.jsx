import { useState, useContext, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AuthContext from '../../contexts/AuthContext';
import itemService from '../../services/itemService';
import { 
  ArchiveBoxIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  ArrowPathIcon,
  TagIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function Historial() {
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('all'); // 'all', 'validados', 'publicados'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await itemService.getItems();
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        console.error('Error al cargar historial:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchHistory();
    return () => { isMounted = false; };
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'validados') return item.processingState === 'validado';
    if (filter === 'publicados') return item.processingState === 'publicado' || !item.processingState;
    return true;
  });

  const validatedCount = items.filter(i => i.processingState === 'validado').length;
  const publishedCount = items.filter(i => i.processingState !== 'validado').length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F6E56] to-[#16a085] p-6 sm:p-8 text-white shadow-xl mb-8">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider mb-3">
                <ArchiveBoxIcon className="w-4 h-4" />
                Trazabilidad y Registro
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold m-0 leading-tight">Archivo Histórico</h1>
              <p className="mt-2 text-sm text-emerald-100 max-w-2xl m-0">
                Consultá la trazabilidad completa de materiales reciclados, certificaciones comunales y movimientos registrados.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider m-0">Total Registros</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1 m-0">{items.length}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                  <ArchiveBoxIcon className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider m-0">Certificados / Validados</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1 m-0">{validatedCount}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider m-0">En Proceso</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1 m-0">{publishedCount}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ClockIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'all' ? 'bg-[#0F6E56] text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Todos ({items.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('validados')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'validados' ? 'bg-[#0F6E56] text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Certificados ({validatedCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('publicados')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'publicados' ? 'bg-[#0F6E56] text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                En Proceso ({publishedCount})
              </button>
            </div>
          </div>

          {/* Items Table / List */}
          {loading ? (
            <div className="py-16 text-center text-gray-400">
              <span className="inline-block w-8 h-8 rounded-full border-3 border-[#0F6E56] border-t-transparent animate-spin mb-3" />
              <p className="text-sm font-medium">Cargando archivo histórico...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-xs">
              <ArchiveBoxIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 m-0">Sin movimientos registrados</h3>
              <p className="text-xs text-gray-500 mt-1 m-0">
                No se encontraron elementos con el filtro actual.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200/70">
                    <tr>
                      <th className="px-5 py-3.5">Material</th>
                      <th className="px-5 py-3.5">Categoría</th>
                      <th className="px-5 py-3.5">Estado</th>
                      <th className="px-5 py-3.5">Ubicación</th>
                      <th className="px-5 py-3.5">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4 font-semibold text-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold">
                              ♻
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 m-0 leading-tight">{item.title}</p>
                              <p className="text-[11px] text-gray-400 m-0 mt-0.5">#{item._id.slice(-6).toUpperCase()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600 font-medium capitalize">
                          {item.category}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            item.processingState === 'validado'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.processingState === 'validado' ? '✅ Validado' : '⏳ Publicado'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-500 max-w-[200px] truncate">
                          {item.address || 'Comuna central'}
                        </td>
                        <td className="px-5 py-4 text-gray-500 font-medium">
                          {new Date(item.createdAt || Date.now()).toLocaleDateString('es-AR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
