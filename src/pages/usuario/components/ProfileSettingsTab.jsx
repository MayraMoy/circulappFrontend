const ProfileSettingsTab = ({ role, onLogoutClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold text-gray-800 m-0">Configuración de Cuenta & Seguridad</h2>
        <p className="text-xs text-gray-500 mt-1 m-0">Gestiona las opciones de tu sesión y permisos.</p>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs font-semibold text-gray-800 m-0 mb-1">
          Permisos de Tu Rol
        </p>
        <p className="text-xs text-gray-600 m-0">
          {role === 'admin' && 'Cuentas con permisos de Administración para auditar el sistema completo.'}
          {role === 'gestor' && 'Cuentas con permisos de Gestor para procesar fardos de reciclaje y coordinar recolecciones.'}
          {role === 'user' && 'Cuentas con permisos de Usuario para publicar y gestionar tus materiales reciclables.'}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-xs font-semibold text-rose-600 m-0 mb-1">Cerrar Sesión</h3>
        <p className="text-xs text-gray-500 m-0 mb-3">Saldrás de tu cuenta en este dispositivo.</p>
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition-colors"
          onClick={onLogoutClick}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileSettingsTab;