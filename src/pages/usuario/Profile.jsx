import Layout from '../../components/layout/Layout';
import ConfirmModal from '../../components/feedback/ConfirmModal';

import useProfile from './hooks/useProfile';
import ProfileHeroBanner from './components/ProfileHeroBanner';
import ProfileTabs from './components/ProfileTabs';
import ProfileInfoTab from './components/ProfileInfoTab';
import ProfileProductsTab from './components/ProfileProductsTab';
import ProfileSettingsTab from './components/ProfileSettingsTab';
import EditItemModal from './components/EditItemModal';

const Profile = () => {
  const {
    user,
    logout,
    navigate,
    activeTab,
    setSearchParams,
    myItems,
    loading,
    editProfileMode,
    setEditProfileMode,
    editingItem,
    setEditingItem,
    editItemData,
    setEditItemData,
    savingItem,
    deletingItemId,
    setDeletingItemId,
    showLogoutConfirm,
    setShowLogoutConfirm,
    profileData,
    setProfileData,
    savingProfile,
    profileMsg,
    confirmDeleteItem,
    handleSaveProfile,
    handleSaveItemEdit,
    getWhatsAppLink
  } = useProfile();

  if (!user) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-[980px] mx-auto">
          
          <ProfileHeroBanner user={user} />

          <ProfileTabs 
            activeTab={activeTab} 
            setSearchParams={setSearchParams} 
            itemsCount={myItems.length} 
          />

          {/* Notificaciones */}
          {profileMsg.text && (
            <div className={`p-4 rounded-xl mb-4 text-xs font-semibold border ${
              profileMsg.type === 'success'
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                : 'bg-rose-50 text-rose-600 border-rose-200'
            }`}>
              {profileMsg.text}
            </div>
          )}

          {/* Pestañas */}
          {activeTab === 'profile' && (
            <ProfileInfoTab 
              user={user}
              editProfileMode={editProfileMode}
              setEditProfileMode={setEditProfileMode}
              profileData={profileData}
              setProfileData={setProfileData}
              handleSaveProfile={handleSaveProfile}
              savingProfile={savingProfile}
              getWhatsAppLink={getWhatsAppLink}
            />
          )}

          {activeTab === 'products' && (
            <ProfileProductsTab 
              items={myItems}
              loading={loading}
              navigate={navigate}
              setEditingItem={setEditingItem}
              setEditItemData={setEditItemData}
              setDeletingItemId={setDeletingItemId}
            />
          )}

          {activeTab === 'settings' && (
            <ProfileSettingsTab 
              role={user.role} 
              onLogoutClick={() => setShowLogoutConfirm(true)} 
            />
          )}

        </div>
      </div>

      <EditItemModal
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
        message="¿Estás seguro de que deseas eliminar este material? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        onConfirm={confirmDeleteItem}
        onCancel={() => setDeletingItemId(null)}
      />

      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Cerrar Sesión"
        message="¿Deseas cerrar tu sesión actual?"
        confirmText="Cerrar Sesión"
        cancelText="Cancelar"
        type="primary"
        onConfirm={() => {
          logout();
          navigate('/');
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </Layout>
  );
};

export default Profile;