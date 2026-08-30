const EditAdminUserModal = ({
  editingUser,
  setEditingUser,
  editUserData,
  setEditUserData,
  handleSaveUserEdit,
  savingUser
}) => {
  if (!editingUser) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-[#0f4c38] to-[#16a085] px-5 py-4 text-white flex justify-between items-center">
          <h3 className="text-sm font-semibold m-0">
            Editar Perfil de {editingUser.name}
          </h3>
          <button
            type="button"
            onClick={() => setEditingUser(null)}
            className="text-white hover:opacity-80 text-lg bg-transparent border-0 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSaveUserEdit} className="p-5 flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editUserData.name}
              onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Teléfono (WhatsApp)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editUserData.phone}
              onChange={e => setEditUserData({ ...editUserData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Ubicación
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editUserData.location}
              onChange={e => setEditUserData({ ...editUserData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Rol
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              value={editUserData.role}
              onChange={e => setEditUserData({ ...editUserData, role: e.target.value })}
            >
              <option value="user">Usuario</option>
              <option value="gestor">Gestor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="flex justify-end gap-2.5 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50"
              onClick={() => setEditingUser(null)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={savingUser}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#16a085] to-[#0f4c38] text-white text-xs font-semibold shadow hover:opacity-90 disabled:opacity-50"
            >
              {savingUser ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminUserModal;