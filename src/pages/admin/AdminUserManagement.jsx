import Layout from '../../components/layout/Layout';
import ConfirmModal from '../../components/feedback/ConfirmModal';

import useAdminUsers from './hooks/useAdminUsers';
import EditAdminUserModal from './components/EditAdminUserModal';
import UserItemsModal from './components/UserItemsModal';
import AdminEditItemModal from './components/AdminEditItemModal';

const AdminUserManagement = () => {
  const {
    user,
    navigate,
    users,
    loading,
    searchTerm,
    setSearchTerm,
    feedbackMsg,
    editingUser,
    setEditingUser,
    editUserData,
    setEditUserData,
    savingUser,
    viewingUserItems,
    setViewingUserItems,
    userItems,
    loadingUserItems,
    editingItem,
    setEditingItem,
    editItemData,
    setEditItemData,
    savingItem,
    deletingItemId,
    setDeletingItemId,
    filteredUsers,
    handleRoleChange,
    handleToggleActive,
    handleSaveUserEdit,
    handleViewUserItems,
    handleOpenEditItem,
    handleSaveItemEdit,
    handleConfirmDeleteItem
  } = useAdminUsers();

  if (!user || (user.role !== 'admin' && user.role !== 'dev' && !user.isDev)) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">

          {/* Banner de Hero */}
          <div className="relative bg-gradient-to-r from-[#0f4c38] to-[#16a085] rounded-2xl p-6 mb-6 text-white overflow-hidden shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative z-10">
              <h1 className="text-xl font-bold tracking-tight m-0">Gestión Global de Usuarios</h1>
              <p className="text-xs text-emerald-100 mt-1 m-0">
                Administra roles, modifica perfiles y revisa las publicaciones de todos los miembros.
              </p>
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl self-start md:self-auto">
              <p className="text-[10px] uppercase font-semibold text-emerald-100 tracking-wider m-0">Total Usuarios</p>
              <p className="text-lg font-bold text-white m-0">{users.length}</p>
            </div>
          </div>

          {/* Notificaciones */}
          {feedbackMsg.text && (
            <div className={`p-4 rounded-xl mb-4 text-xs font-semibold border ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                : 'bg-rose-50 text-rose-600 border-rose-200'
            }`}>
              {feedbackMsg.text}
            </div>
          )}

          {/* Tabla de Usuarios */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                  onClick={() => navigate('/dashboard')}
                >
                  ← Volver
                </button>
                <h2 className="text-base font-semibold text-gray-800 m-0">
                  Lista General ({filteredUsers.length})
                </h2>
              </div>

              <input
                type="text"
                placeholder="Buscar por nombre, email o rol..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
              />
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-500 text-xs">
                Cargando usuarios...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-xs">
                No se encontraron usuarios.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      <th className="pb-3 px-2">Usuario / Datos</th>
                      <th className="pb-3 px-2">Contacto</th>
                      <th className="pb-3 px-2">Rol Asignado</th>
                      <th className="pb-3 px-2">Estado</th>
                      <th className="pb-3 px-2 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filteredUsers.map(u => (
                      <tr key={u._id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-2">
                          <div className="font-semibold text-gray-800">{u.name}</div>
                          <div className="text-[11px] text-gray-400">{u.email}</div>
                        </td>

                        <td className="py-3 px-2">
                          <div className="text-gray-700">{u.phone || '—'}</div>
                          {u.location && (
                            <div className="text-[11px] text-gray-400">{u.location}</div>
                          )}
                        </td>

                        <td className="py-3 px-2">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold focus:outline-none ${
                              u.role === 'admin'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : u.role === 'gestor'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="user">Usuario</option>
                            <option value="gestor">Gestor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                            u.active
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-rose-50 text-rose-600 border border-rose-200'
                          }`}>
                            {u.active ? 'ACTIVO' : 'INACTIVO'}
                          </span>
                        </td>

                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              className="px-2.5 py-1 rounded-lg border border-[#16a085]/30 text-[#0f4c38] hover:bg-[#16a085]/10 font-semibold"
                              onClick={() => {
                                setEditingUser(u);
                                setEditUserData({
                                  name: u.name || '',
                                  phone: u.phone || '',
                                  location: u.location || '',
                                  role: u.role || 'user',
                                  active: u.active ?? true
                                });
                              }}
                            >
                              <i className="bi bi-pencil me-1"></i>Editar
                            </button>

                            <button
                              type="button"
                              className="px-2.5 py-1 rounded-lg border border-[#16a085]/30 text-[#16a085] hover:bg-[#16a085]/10 font-semibold"
                              onClick={() => handleViewUserItems(u)}
                            >
                              <i className="bi bi-box-seam me-1"></i>Publicaciones
                            </button>

                            <button
                              type="button"
                              className={`px-2.5 py-1 rounded-lg border font-semibold ${
                                u.active
                                  ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                                  : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                              }`}
                              onClick={() => handleToggleActive(u._id, u.active)}
                            >
                              {u.active ? 'Desactivar' : 'Activar'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>

      <EditAdminUserModal
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        editUserData={editUserData}
        setEditUserData={setEditUserData}
        handleSaveUserEdit={handleSaveUserEdit}
        savingUser={savingUser}
      />

      <UserItemsModal
        viewingUserItems={viewingUserItems}
        setViewingUserItems={setViewingUserItems}
        loadingUserItems={loadingUserItems}
        userItems={userItems}
        handleOpenEditItem={handleOpenEditItem}
        setDeletingItemId={setDeletingItemId}
      />

      <AdminEditItemModal
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        editItemData={editItemData}
        setEditItemData={setEditItemData}
        handleSaveItemEdit={handleSaveItemEdit}
        savingItem={savingItem}
      />

      <ConfirmModal
        isOpen={Boolean(deletingItemId)}
        title="Eliminar Publicación"
        message="¿Estás seguro de que deseas eliminar permanentemente este material como administrador?"
        confirmText="Sí, Eliminar"
        cancelText="Cancelar"
        type="danger"
        onConfirm={handleConfirmDeleteItem}
        onCancel={() => setDeletingItemId(null)}
      />
    </Layout>
  );
};

export default AdminUserManagement;