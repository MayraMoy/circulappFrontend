import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Layout from '../../components/layout/Layout';
import API from '../../services/Api';
import StateBadge from '../../components/badges/StateBadge';
import ConfirmModal from '../../components/feedback/ConfirmModal';
import '../dashboard/Dashboard.css';

const categoryNames = {
  plastico: 'Plástico', papel: 'Papel y Cartón', vidrio: 'Vidrio',
  metal: 'Metal', textil: 'Textil', electronico: 'Electrónico', otro: 'Otro'
};

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromQuery || 'profile');

  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProfileMode, setEditProfileMode] = useState(false);

  // Estados para modal de edición de publicación
  const [editingItem, setEditingItem] = useState(null);
  const [editItemData, setEditItemData] = useState({ title: '', description: '', category: '', address: '' });
  const [savingItem, setSavingItem] = useState(false);

  // Estados para modales de confirmación
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Estado de formulario de perfil
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (tabFromQuery) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  useEffect(() => {
    if (!user) return navigate('/login');

    setProfileData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || ''
    });
  }, [user, navigate]);

  const fetchUserItems = async () => {
    if (!user?.id) return setLoading(false);
    setLoading(true);
    try {
      const res = await API.get(`/items?ownerId=${user.id}`);
      setMyItems(res.data);
    } catch (err) {
      console.error('Error al cargar publicaciones:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, [user]);

  const confirmDeleteItem = async () => {
    if (!deletingItemId) return;
    try {
      await API.delete(`/items/${deletingItemId}`);
      setMyItems(prev => prev.filter(i => i._id !== deletingItemId));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error al eliminar la publicación');
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg({ type: '', text: '' });

    try {
      const payload = {
        name: profileData.name.trim(),
        email: user.email,
        phone: profileData.phone.trim(),
        location: profileData.location.trim(),
        bio: profileData.bio.trim()
      };

      const res = await API.put('/users/profile', payload);
      updateUser(res.data);
      setEditProfileMode(false);
      setProfileMsg({ type: 'success', text: 'Perfil actualizado correctamente.' });
    } catch (err) {
      setProfileMsg({ type: 'danger', text: err.response?.data?.msg || 'Error al actualizar el perfil.' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveItemEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setSavingItem(true);
    try {
      const formData = new FormData();
      formData.append('title', editItemData.title);
      formData.append('description', editItemData.description);
      formData.append('category', editItemData.category);
      formData.append('address', editItemData.address);

      if (editItemData.keepImages && editItemData.keepImages.length > 0) {
        editItemData.keepImages.forEach(img => formData.append('keepImages', img));
      } else {
        formData.append('keepImages', ''); // indicar que se borraron todas las anteriores
      }

      if (editItemData.newFiles && editItemData.newFiles.length > 0) {
        editItemData.newFiles.forEach(file => formData.append('images', file));
      }

      const res = await API.put(`/items/${editingItem._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMyItems(prev => prev.map(item => item._id === editingItem._id ? res.data : item));
      setEditingItem(null);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error al actualizar la publicación');
    } finally {
      setSavingItem(false);
    }
  };

  const getWhatsAppLink = (phone) => {
    if (!phone) return null;
    const clean = phone.replace(/\D/g, '');
    if (!clean) return null;
    const formatted = clean.startsWith('54') ? clean : `54${clean}`;
    return `https://wa.me/${formatted}`;
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="dashboard-wrapper">
        <div className="dashboard-inner">

          {/* Banner de Perfil Principal */}
          <div className="hero-banner">
            <div className="hero-banner-deco" />
            <div className="hero-banner-deco-2" />

            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#0f4c38',
                  fontSize: '24px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  flexShrink: 0
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>

              <div>
                <h1 className="hero-title">{user.name}</h1>
                <p className="hero-sub">{user.email}</p>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <span
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#FFFFFF',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                Rol: {user.role === 'admin' ? 'Administrador' : user.role === 'gestor' ? 'Gestor' : 'Usuario'}
              </span>
            </div>
          </div>

          {/* Pestañas de Navegación del Perfil */}
          <div className="section-card" style={{ marginBottom: "20px", padding: "12px" }}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => { setActiveTab('profile'); setSearchParams({}); }}
                className={`footer-btn ${activeTab === 'profile' ? 'primary' : 'secondary'}`}
                style={{ width: 'auto', padding: '10px 20px' }}
              >
                Mi Perfil
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('products'); setSearchParams({ tab: 'products' }); }}
                className={`footer-btn ${activeTab === 'products' ? 'primary' : 'secondary'}`}
                style={{ width: 'auto', padding: '10px 20px' }}
              >
                Mis Publicaciones ({myItems.length})
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('settings'); setSearchParams({ tab: 'settings' }); }}
                className={`footer-btn ${activeTab === 'settings' ? 'primary' : 'secondary'}`}
                style={{ width: 'auto', padding: '10px 20px' }}
              >
                Configuración y Seguridad
              </button>
            </div>
          </div>

          {/* MENSAJES DE NOTIFICACIÓN */}
          {profileMsg.text && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: '600',
                background: profileMsg.type === 'success' ? 'rgba(39,174,96,0.12)' : 'rgba(231,76,60,0.12)',
                color: profileMsg.type === 'success' ? '#27AE60' : '#E74C3C',
                border: `1px solid ${profileMsg.type === 'success' ? 'rgba(39,174,96,0.25)' : 'rgba(231,76,60,0.25)'}`
              }}
            >
              {profileMsg.text}
            </div>
          )}

          {/* PESTAÑA 1: MI PERFIL */}
          {activeTab === 'profile' && (
            <div className="section-card">
              {!editProfileMode ? (
                <div>
                  <div className="section-header">
                    <h2 className="section-title">Información Personal</h2>
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => setEditProfileMode(true)}
                    >
                      Editar Perfil
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '16px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: '0 0 4px', fontWeight: '600' }}>
                        Nombre Completo
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                        {user.name}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: '0 0 4px', fontWeight: '600' }}>
                        Correo Electrónico
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                        {user.email}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: '0 0 4px', fontWeight: '600' }}>
                        Teléfono de Contacto
                      </p>
                      {user.phone ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                            {user.phone}
                          </p>
                          {getWhatsAppLink(user.phone) && (
                            <a
                              href={getWhatsAppLink(user.phone)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: '#25D366',
                                color: '#FFF',
                                padding: '3px 10px',
                                borderRadius: '999px',
                                fontSize: '11px',
                                fontWeight: '600',
                                textDecoration: 'none'
                              }}
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      ) : (
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                          No registrado
                        </p>
                      )}
                    </div>

                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: '0 0 4px', fontWeight: '600' }}>
                        Ubicación / Ciudad
                      </p>
                      <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: 0 }}>
                        {user.location || '—'}
                      </p>
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: '0 0 4px', fontWeight: '600' }}>
                        Biografía / Presentación
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>
                        {user.bio || 'Sin biografía.'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h2 className="section-title">Editar Información de Perfil</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #DEE2E6',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                        value={profileData.name}
                        onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                        Teléfono (WhatsApp)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: +541122334455"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #DEE2E6',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                        value={profileData.phone}
                        onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                        Ubicación / Ciudad
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Buenos Aires, Argentina"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #DEE2E6',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                        value={profileData.location}
                        onChange={e => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                        Biografía o Presentación
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Cuenta brevemente tu interés en el reciclaje..."
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid #DEE2E6',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                        value={profileData.bio}
                        onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                    <button
                      type="button"
                      className="footer-btn secondary"
                      style={{ width: 'auto', padding: '10px 24px' }}
                      onClick={() => setEditProfileMode(false)}
                      disabled={savingProfile}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="publish-cta"
                      disabled={savingProfile}
                    >
                      {savingProfile ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* PESTAÑA 2: MIS PUBLICACIONES */}
          {activeTab === 'products' && (
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">Mis Materiales Publicados</h2>
                <button
                  type="button"
                  className="publish-cta"
                  onClick={() => navigate('/publish')}
                >
                  + Publicar Nuevo Material
                </button>
              </div>

              {loading ? (
                <div className="empty-box">
                  <p>Cargando tus publicaciones...</p>
                </div>
              ) : myItems.length === 0 ? (
                <div className="empty-box">
                  <p className="empty-text">No tienes publicaciones activas.</p>
                  <button
                    type="button"
                    className="publish-cta"
                    onClick={() => navigate('/publish')}
                  >
                    Publicar tu primer material
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  {myItems.map(item => (
                    <div
                      key={item._id}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #EAECEF',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ height: '160px', background: '#EAECEF', position: 'relative' }}>
                        {item.images && item.images[0] ? (
                          <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
                            📷 Sin foto
                          </div>
                        )}
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                          <StateBadge state={item.processingState} />
                        </div>
                      </div>

                      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                              {item.title}
                            </h3>
                            <span style={{ fontSize: '11px', background: '#F3F4F6', color: '#4B5563', padding: '2px 8px', borderRadius: '999px', fontWeight: '500' }}>
                              {categoryNames[item.category] || item.category}
                            </span>
                          </div>

                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px', lineHeight: '1.4' }}>
                            {item.description || 'Sin descripción.'}
                          </p>

                          {item.address && (
                            <p style={{ fontSize: '11px', color: 'var(--primary)', margin: '0 0 12px' }}>
                              📍 {item.address}
                            </p>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #F1F3F5' }}>
                          <button
                            type="button"
                            className="footer-btn primary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => {
                              setEditingItem(item);
                              setEditItemData({
                                title: item.title,
                                description: item.description || '',
                                category: item.category,
                                address: item.address || ''
                              });
                            }}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="footer-btn secondary"
                            style={{ padding: '6px 12px', fontSize: '12px', color: '#E74C3C', borderColor: 'rgba(231,76,60,0.3)' }}
                            onClick={() => setDeletingItemId(item._id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PESTAÑA 3: CONFIGURACIÓN Y SEGURIDAD */}
          {activeTab === 'settings' && (
            <div className="section-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 className="section-title">Configuración de Cuenta & Seguridad</h2>
                <p className="item-subtitle">Gestiona las opciones de tu sesión y permisos.</p>
              </div>

              <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 4px' }}>
                  Permisos de Tu Rol
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                  {user.role === 'admin' && 'Cuentas con permisos de Administración para auditar el sistema completo.'}
                  {user.role === 'gestor' && 'Cuentas con permisos de Gestor para procesar fardos de reciclaje y coordinar recolecciones.'}
                  {user.role === 'user' && 'Cuentas con permisos de Usuario para publicar y gestionar tus materiales reciclables.'}
                </p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F3F5' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#E74C3C', margin: '0 0 6px' }}>Cerrar Sesión</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px' }}>Saldrás de tu cuenta en este dispositivo.</p>
                <button
                  type="button"
                  className="footer-btn secondary"
                  style={{ width: 'auto', padding: '10px 24px', color: '#E74C3C', borderColor: 'rgba(231,76,60,0.3)' }}
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL DE EDICIÓN DE PUBLICACIÓN */}
      {editingItem && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '16px'
          }}
        >
          <div style={{ background: '#FFF', borderRadius: '18px', width: '100%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f4c38, #16A085)', padding: '16px 20px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>Editar Publicación</h3>
              <button type="button" onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveItemEdit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Título</label>
                <input
                  type="text"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editItemData.title}
                  onChange={e => setEditItemData({ ...editItemData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Categoría</label>
                <select
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editItemData.category}
                  onChange={e => setEditItemData({ ...editItemData, category: e.target.value })}
                >
                  {Object.entries(categoryNames).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Descripción</label>
                <textarea
                  rows="3"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editItemData.description}
                  onChange={e => setEditItemData({ ...editItemData, description: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Dirección</label>
                <input
                  type="text"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editItemData.address}
                  onChange={e => setEditItemData({ ...editItemData, address: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="footer-btn secondary" style={{ width: 'auto', padding: '8px 18px' }} onClick={() => setEditingItem(null)}>
                  Cancelar
                </button>
                <button type="submit" className="publish-cta" disabled={savingItem}>
                  {savingItem ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALES DE CONFIRMACIÓN */}
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