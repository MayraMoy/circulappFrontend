const ProfileTabs = ({ activeTab, setSearchParams, itemsCount }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 mb-5 shadow-sm">
      <div className="flex gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={() => setSearchParams({})}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'profile'
              ? 'bg-[#16a085]/10 border border-[#16a085]/30 text-[#0f4c38]'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Mi Perfil
        </button>

        <button
          type="button"
          onClick={() => setSearchParams({ tab: 'products' })}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'products'
              ? 'bg-[#16a085]/10 border border-[#16a085]/30 text-[#0f4c38]'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Mis Publicaciones ({itemsCount})
        </button>

        <button
          type="button"
          onClick={() => setSearchParams({ tab: 'settings' })}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#16a085]/10 border border-[#16a085]/30 text-[#0f4c38]'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Configuración y Seguridad
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;