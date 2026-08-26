import { CATEGORY_NAMES } from '../hooks/useAdminUsers';

const AdminEditItemModal = ({
  editingItem,
  setEditingItem,
  editItemData,
  setEditItemData,
  handleSaveItemEdit,
  savingItem
}) => {
  if (!editingItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="bg-gradient-to-r from-[#0f4c38] to-[#16a085] px-5 py-4 text-white flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-sm font-semibold m-0">Editar Publicación</h3>
          <button
            type="button"
            onClick={() => setEditingItem(null)}
            className="text-white hover:opacity-80 text-lg bg-transparent border-0 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSaveItemEdit} className="p-5 flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Título</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editItemData.title}
              onChange={e => setEditItemData({ ...editItemData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Categoría</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editItemData.category}
              onChange={e => setEditItemData({ ...editItemData, category: e.target.value })}
            >
              {Object.entries(CATEGORY_NAMES).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Descripción</label>
            <textarea
              rows="3"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editItemData.description}
              onChange={e => setEditItemData({ ...editItemData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Dirección</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editItemData.address}
              onChange={e => setEditItemData({ ...editItemData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Imágenes</label>
            {editItemData.keepImages?.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-2">
                {editItemData.keepImages.map((img, idx) => (
                  <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-300">
                    <img src={img} alt="Foto" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setEditItemData({
                        ...editItemData,
                        keepImages: editItemData.keepImages.filter((_, i) => i !== idx)
                      })}
                      className="absolute top-0.5 right-0.5 bg-red-600/90 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center border-0 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={e => setEditItemData({ ...editItemData, newFiles: Array.from(e.target.files) })}
              className="text-xs text-gray-600"
            />
          </div>

          <div className="flex justify-end gap-2.5 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50"
              onClick={() => setEditingItem(null)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={savingItem}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#16a085] to-[#0f4c38] text-white text-xs font-semibold shadow hover:opacity-90 disabled:opacity-50"
            >
              {savingItem ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditItemModal;