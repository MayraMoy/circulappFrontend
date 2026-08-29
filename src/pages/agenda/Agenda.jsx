import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import itemService from '../../services/itemService';
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  ClockIcon, 
  TruckIcon, 
  CheckCircleIcon,
  PhoneIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function Agenda() {
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'in_progress', 'completed'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAgendaItems = async () => {
      setLoading(true);
      try {
        const data = await itemService.getItems();
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        console.error('Error al cargar la agenda:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAgendaItems();
    return () => { isMounted = false; };
  }, []);

  const scheduledList = items.map((item, idx) => {
    const date = new Date(item.createdAt || Date.now());
    date.setDate(date.getDate() + (idx % 5) + 1);
    
    const statuses = ['programado', 'en_camino', 'completado'];
    const status = statuses[idx % 3];

    return {
      ...item,
      scheduledDate: date.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' }),
      scheduledTime: `${9 + (idx % 8)}:00 hs`,
      status
    };
  });

  const filteredItems = scheduledList.filter(item => {
    if (filter === 'pending') return item.status === 'programado';
    if (filter === 'in_progress') return item.status === 'en_camino';
    if (filter === 'completed') return item.status === 'completado';
    return true;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F6E56] to-[#16a085] p-6 sm:p-8 text-white shadow-xl mb-8">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider mb-3">
                <CalendarDaysIcon className="w-4 h-4" />
                Logística y Recolección
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold m-0 leading-tight">Agenda de Recolección</h1>
              <p className="mt-2 text-sm text-emerald-100 max-w-2xl m-0">
                Gestioná los turnos programados, coordiná retiros de materiales reciclables y optimizá las rutas de recolección comunal.
              </p>
            </div>
            {/* Background shapes */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider m-0">Programados</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1 m-0">
                    {scheduledList.filter(i => i.status === 'programado').length}
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ClockIcon className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider m-0">En Camino</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1 m-0">
                    {scheduledList.filter(i => i.status === 'en_camino').length}
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <TruckIcon className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200/70 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider m-0">Completados</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1 m-0">
                    {scheduledList.filter(i => i.status === 'completado').length}
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6" />
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
                Todos ({scheduledList.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'pending' ? 'bg-[#0F6E56] text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Programados
              </button>
              <button
                type="button"
                onClick={() => setFilter('in_progress')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'in_progress' ? 'bg-[#0F6E56] text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                En Camino
              </button>
              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'completed' ? 'bg-[#0F6E56] text-white shadow-xs' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Completados
              </button>
            </div>
          </div>

          {/* Items List */}
          {loading ? (
            <div className="py-16 text-center text-gray-400">
              <span className="inline-block w-8 h-8 rounded-full border-3 border-[#0F6E56] border-t-transparent animate-spin mb-3" />
              <p className="text-sm font-medium">Cargando turnos y rutas de recolección...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-xs">
              <CalendarDaysIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 m-0">No hay retiros registrados</h3>
              <p className="text-xs text-gray-500 mt-1 m-0">
                No se encontraron turnos con el filtro seleccionado.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          item.status === 'programado'
                            ? 'bg-amber-100 text-amber-800'
                            : item.status === 'en_camino'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.status === 'programado' && '⏳ Programado'}
                          {item.status === 'en_camino' && '🚚 En Camino'}
                          {item.status === 'completado' && '✅ Completado'}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 mt-2 m-0 leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-[#0F6E56] block">{item.scheduledDate}</span>
                        <span className="text-[11px] text-gray-400 font-medium">{item.scheduledTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs text-gray-600 mb-4">
                      <div className="flex items-center gap-1.5">
                        <TagIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span>Categoría: <strong className="text-gray-800">{item.category}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{item.address || 'Punto de acopio municipal'}</span>
                      </div>
                      {item.ownerId?.name && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-gray-400">👤</span>
                          <span>Ofertante: <strong className="text-gray-800">{item.ownerId.name}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    {item.ownerId?.phone ? (
                      <a
                        href={`https://wa.me/${item.ownerId.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors"
                      >
                        <PhoneIcon className="w-3.5 h-3.5" />
                        Contactar
                      </a>
                    ) : (
                      <span className="text-[11px] text-gray-400">Sin teléfono</span>
                    )}

                    <span className="text-[11px] font-semibold text-gray-500">
                      ID: #{item._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
