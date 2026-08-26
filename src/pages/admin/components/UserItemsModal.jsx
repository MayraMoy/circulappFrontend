import { CATEGORY_NAMES } from '../hooks/useAdminUsers';

const UserItemsModal = ({
  viewingUserItems,
  setViewingUserItems,
  loadingUserItems,
  userItems,
  handleOpenEditItem,
  setDeletingItemId
}) => {
  if (!viewingUserItems) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="bg-gradient-to-r from-[#0f4c38] to-[#16a085] px-5 py-4 text-white flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-sm font-semibold m-0">
            Publicaciones de {viewingUserItems.name}
          </h3>
          <button
            type="button"
            onClick={() => setViewingUserItems(null)}
            className="text-white hover:opacity-80 text-lg bg-transparent border-0 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {loadingUserItems ? (
            <p className="text-center text-xs text-gray-500 my-4">Cargando publicaciones...</p>
          ) : userItems.length === 0 ? (
            <p className="text-center text-xs text-gray-500 my-4">
              Este usuario no tiene publicaciones registradas.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {userItems.map(item => (
                <div
                  key={item._id}
                  className="p-3.5 border border-gray-200 rounded-xl flex items-center justify-between gap-3 flex-wrap"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-[220px]">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      {item.images && item.images[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-[11px]">
                          Sin foto
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-800 m-0 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 m-0">
                        Categoría: {CATEGORY_NAMES[item.category] || item.category} | Estado: {item.processingState}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg border border-[#16a085]/30 text-[#0f4c38] text-xs font-semibold hover:bg-[#16a085]/10"
                      onClick={() => handleOpenEditItem(item)}
                    >
                      <i className="bi bi-pencil me-1"></i>Editar
                    </button>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50"
                      onClick={() => setDeletingItemId(item._id)}
                    >
                      <i className="bi bi-trash me-1"></i>Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserItemsModal;