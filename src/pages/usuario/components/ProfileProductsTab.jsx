import StateBadge from '../../../components/badges/StateBadge';
import { CATEGORY_NAMES } from '../data/profileData';

const ProfileProductsTab = ({
  items,
  loading,
  navigate,
  setEditingItem,
  setEditItemData,
  setDeletingItemId
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-semibold text-gray-800 m-0">Mis Materiales Publicados</h2>
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#16a085] to-[#0f4c38] text-white text-xs font-semibold shadow hover:opacity-90 transition-opacity"
          onClick={() => navigate('/publish')}
        >
          + Publicar Nuevo Material
        </button>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500 text-xs">
          <p>Cargando tus publicaciones...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          <p className="text-xs mb-3">No tienes publicaciones activas.</p>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#16a085] to-[#0f4c38] text-white text-xs font-semibold shadow hover:opacity-90"
            onClick={() => navigate('/publish')}
          >
            Publicar tu primer material
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(item => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 relative">
                {item.images && item.images[0] ? (
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    📷 Sin foto
                  </div>
                )}
                <div className="absolute top-2.5 right-2.5">
                  <StateBadge state={item.processingState} />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-gray-800 m-0 truncate">
                      {item.title}
                    </h3>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                      {CATEGORY_NAMES[item.category] || item.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 m-0 mb-3 leading-snug line-clamp-2">
                    {item.description || 'Sin descripción.'}
                  </p>

                  {item.address && (
                    <p className="text-[11px] text-[#16a085] m-0 mb-3 truncate">
                      📍 {item.address}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    className="flex-1 py-1.5 px-3 rounded-lg border border-[#16a085]/30 text-[#0f4c38] text-xs font-semibold hover:bg-[#16a085]/10 transition-colors"
                    onClick={() => {
                      setEditingItem(item);
                      setEditItemData({
                        title: item.title,
                        description: item.description || '',
                        category: item.category,
                        address: item.address || ''
                      });
                    }}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="flex-1 py-1.5 px-3 rounded-lg border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition-colors"
                    onClick={() => setDeletingItemId(item._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileProductsTab;