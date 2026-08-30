const ProfileHeroBanner = ({ user }) => {
  const roleLabels = {
    admin: 'Administrador',
    gestor: 'Gestor',
    user: 'Usuario'
  };

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-4 overflow-hidden p-6 md:p-8 mb-7 rounded-2xl bg-gradient-to-br from-[#0f4c38] via-[#115e45] to-[#16a085] shadow-xl text-white">
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute right-20 -bottom-14 w-36 h-36 rounded-full bg-white/5 opacity-80 pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-15 h-15 rounded-full bg-white text-[#0f4c38] text-2xl font-bold flex items-center justify-center shadow-md flex-shrink-0">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold m-0">{user.name}</h1>
          <p className="text-sm text-white/75 m-0 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="relative z-10">
        <span className="bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
          Rol: {roleLabels[user.role] || 'Usuario'}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeroBanner;