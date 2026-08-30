import { CATEGORY_NAMES } from '../data/profileData';

const EditItemModal = ({ editingItem, setEditingItem, editItemData, setEditItemData, handleSaveItemEdit, savingItem }) => {
  if (!editingItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-[#0f4c38] to-[#16a085] p-4 px-6 text-white flex justify-between items-center">
          <h3 className="text-base font-semibold m-0">Editar Publicación</h3>
          <button type="button" onClick={() => setEditingItem(null)} className="text-white text-xl font-bold hover:opacity-80">✕</button>
        </div>

        <form onSubmit={handleSaveItemEdit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Título</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editItemData.title}
              onChange={e => setEditItemData({ ...editItemData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Categoría</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a085]"
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
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editItemData.description}
              onChange={e => setEditItemData({ ...editItemData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Dirección</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editItemData.address}
              onChange={e => setEditItemData({ ...editItemData, address: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
              onClick={() => setEditingItem(null)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={savingItem}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#16a085] to-[#0f4c38] text-white text-sm font-semibold shadow hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {savingItem ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;