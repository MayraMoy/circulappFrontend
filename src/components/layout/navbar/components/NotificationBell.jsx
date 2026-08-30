// frontend/src/components/layout/navbar/components/NotificationBell.jsx
import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationContext from '../../../../contexts/NotificationContext';
import {
  BellIcon,
  CheckCircleIcon,
  SparklesIcon,
  MapPinIcon,
  StarIcon,
  ArchiveBoxIcon,
  TrashIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diffSec = Math.floor((now - date) / 1000);

  if (diffSec < 60) return 'Hace un momento';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `Hace ${diffMin} min`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Hace ${diffHours} h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `Hace ${diffDays} d`;
  return date.toLocaleDateString();
};

const getNotificationIcon = (type) => {
  switch (type) {
    case 'item_published_nearby':
      return { icon: MapPinIcon, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
    case 'item_validated':
      return { icon: CheckCircleIcon, bg: 'bg-teal-50 text-teal-600 border-teal-200' };
    case 'item_baled':
      return { icon: ArchiveBoxIcon, bg: 'bg-amber-50 text-amber-600 border-amber-200' };
    case 'rating_received':
      return { icon: StarIcon, bg: 'bg-yellow-50 text-yellow-600 border-yellow-200' };
    default:
      return { icon: SparklesIcon, bg: 'bg-blue-50 text-blue-600 border-blue-200' };
  }
};

export default function NotificationBell() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearReadNotifications
  } = useContext(NotificationContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar al hacer clic fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNotificationClick = (item) => {
    if (!item.read) {
      markAsRead(item._id);
    }
    if (item.link) {
      navigate(item.link);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón Campana */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="relative p-2 rounded-xl text-gray-600 hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center focus:outline-none"
        title="Centro de notificaciones"
        aria-label="Centro de notificaciones"
      >
        <BellIcon className="w-5 h-5" />

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-600 text-[10px] font-extrabold text-white ring-2 ring-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Menú Desplegable Flotante */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-gray-200 bg-white shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Cabecera */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900 m-0">Notificaciones</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0F6E56] text-[11px] font-bold">
                  {unreadCount} nuevas
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] text-[#0F6E56] hover:text-[#0a4d3c] font-semibold flex items-center gap-1 cursor-pointer border-0 bg-transparent transition-colors"
              >
                <CheckIcon className="w-3.5 h-3.5" />
                Marcar leídas
              </button>
            )}
          </div>

          {/* Lista de Notificaciones */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="py-10 text-center px-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                  <BellIcon className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-gray-800 m-0">Todo al día</p>
                <p className="text-xs text-gray-500 m-0 mt-1">
                  Te avisaremos cuando haya novedades en tu comunidad.
                </p>
              </div>
            ) : (
              notifications.map((item) => {
                const { icon: ItemIcon, bg } = getNotificationIcon(item.type);
                return (
                  <div
                    key={item._id}
                    className={`group relative flex items-start gap-3 p-3.5 transition-colors cursor-pointer ${
                      item.read ? 'bg-white hover:bg-gray-50/80' : 'bg-emerald-50/30 hover:bg-emerald-50/60'
                    }`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    {/* Indicador de no leída */}
                    {!item.read && (
                      <span className="absolute left-1.5 top-5 w-2 h-2 rounded-full bg-[#0F6E56]" />
                    )}

                    {/* Icono de categoría */}
                    <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border ${bg}`}>
                      <ItemIcon className="w-4 h-4" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0 pr-4">
                      <p className={`text-xs m-0 leading-tight ${item.read ? 'font-medium text-gray-800' : 'font-bold text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className="text-[11px] text-gray-600 m-0 mt-1 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium mt-1.5 block">
                        {formatTimeAgo(item.createdAt)}
                      </span>
                    </div>

                    {/* Botón eliminar alerta */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(item._id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all border-0 bg-transparent cursor-pointer"
                      title="Eliminar notificación"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Pie del desplegable */}
          {notifications.some(n => n.read) && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={clearReadNotifications}
                className="text-[11px] text-gray-500 hover:text-rose-600 font-medium transition-colors cursor-pointer border-0 bg-transparent"
              >
                Limpiar historial de leídas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
