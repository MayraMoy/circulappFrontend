const AdminUsersTable = ({ users, onPromote, onToggleActive }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left pb-3 text-xs font-semibold text-gray-500">Usuario</th>
            <th className="text-left pb-3 text-xs font-semibold text-gray-500">Rol</th>
            <th className="text-left pb-3 text-xs font-semibold text-gray-500">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 5).map((u) => (
            <tr key={u._id} className="border-t border-gray-100">
              <td className="py-3">
                <div className="text-sm font-semibold text-gray-800">{u.name}</div>
                <div className="text-xs text-gray-500">{u.email}</div>
              </td>
              <td className="py-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase ${
                    u.role === "admin"
                      ? "bg-purple-600 text-white"
                      : u.role === "gestor"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {u.role}
                </span>
              </td>
              <td className="py-3">
                {u.role === "user" && (
                  <button
                    onClick={() => onPromote(u._id)}
                    className="text-xs font-semibold text-emerald-600 mr-2.5 bg-transparent border-0 cursor-pointer"
                  >
                    Promover
                  </button>
                )}
                <button
                  onClick={() => onToggleActive(u._id, u.active)}
                  className={`text-xs font-semibold bg-transparent border-0 cursor-pointer ${
                    u.active ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {u.active ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;