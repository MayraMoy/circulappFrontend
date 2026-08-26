const ProfileInfoTab = ({
  user,
  editProfileMode,
  setEditProfileMode,
  profileData,
  setProfileData,
  handleSaveProfile,
  savingProfile,
  getWhatsAppLink
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {!editProfileMode ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-800 m-0">Información Personal</h2>
            <button
              type="button"
              className="text-xs font-semibold text-[#16a085] hover:underline"
              onClick={() => setEditProfileMode(true)}
            >
              Editar Perfil
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Nombre Completo</p>
              <p className="text-sm font-semibold text-gray-800 m-0">{user.name}</p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Correo Electrónico</p>
              <p className="text-sm font-semibold text-gray-800 m-0">{user.email}</p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Teléfono de Contacto</p>
              {user.phone ? (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800 m-0">{user.phone}</p>
                  {getWhatsAppLink(user.phone) && (
                    <a
                      href={getWhatsAppLink(user.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold hover:opacity-90"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic m-0">No registrado</p>
              )}
            </div>

            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Ubicación / Ciudad</p>
              <p className="text-sm text-gray-800 m-0">{user.location || '—'}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Biografía / Presentación</p>
              <p className="text-xs text-gray-700 m-0 leading-relaxed">{user.bio || 'Sin biografía.'}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-gray-800 m-0">Editar Información de Perfil</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre Completo</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                value={profileData.name}
                onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Teléfono (WhatsApp)</label>
              <input
                type="text"
                placeholder="Ej: +541122334455"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                value={profileData.phone}
                onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Ubicación / Ciudad</label>
              <input
                type="text"
                placeholder="Ej: Buenos Aires, Argentina"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                value={profileData.location}
                onChange={e => setProfileData({ ...profileData, location: e.target.value })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Biografía o Presentación</label>
              <textarea
                rows="3"
                placeholder="Cuenta brevemente tu interés en el reciclaje..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#16a085]"
                value={profileData.bio}
                onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
              onClick={() => setEditProfileMode(false)}
              disabled={savingProfile}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={savingProfile}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#16a085] to-[#0f4c38] text-white text-xs font-semibold shadow hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {savingProfile ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileInfoTab;