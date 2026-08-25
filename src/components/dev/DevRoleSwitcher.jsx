import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import API from '../../services/Api';

const DevRoleSwitcher = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [switching, setSwitching] = useState(false);

  // Solo visible para usuarios con rol DEV o atributo isDev configurado en base de datos
  if (!user || (!user.isDev && user.role !== 'dev')) return null;

  const roles = [
    { id: 'user', label: '👤 Usuario' },
    { id: 'gestor', label: '⚙️ Gestor' },
    { id: 'admin', label: '🛡️ Admin' }
  ];

  const handleRoleChange = async (roleId) => {
    if (user.role === roleId || switching) return;
    setSwitching(true);
    try {
      const res = await API.post('/auth/dev-switch-role', { newRole: roleId });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }
      if (res.data?.user) {
        updateUser(res.data.user);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al cambiar rol DEV:', err);
      alert(err.response?.data?.msg || 'Error al cambiar de rol en el servidor.');
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-emerald-300/40 shadow-inner">
      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-2 select-none flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        DEV
      </span>

      {roles.map((r) => {
        const isActive = user.role === r.id;
        return (
          <button
            key={r.id}
            type="button"
            disabled={switching}
            onClick={() => handleRoleChange(r.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
              isActive
                ? 'bg-primary text-white shadow-sm scale-[1.02]'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
            title={`Cambiar vista activa y permisos a ${r.label}`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
};

export default DevRoleSwitcher;
