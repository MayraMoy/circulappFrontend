import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import Layout from '../../components/layout/Layout';
import API from '../../services/Api';
import ConfirmModal from '../../components/feedback/ConfirmModal';
import '../dashboard/Dashboard.css';

const categoryNames = {
  plastico: 'Plástico', papel: 'Papel y Cartón', vidrio: 'Vidrio',
  metal: 'Metal', textil: 'Textil', electronico: 'Electrónico', otro: 'Otro'
};

const AdminUserManagement = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });

  // Modales de Usuario
  const [editingUser, setEditingUser] = useState(null);
  const [editUserData, setEditUserData] = useState({ name: '', phone: '', location: '', role: 'user', active: true });
  const [savingUser, setSavingUser] = useState(false);

  // Modal Ver Publicaciones
  const [viewingUserItems, setViewingUserItems] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [loadingUserItems, setLoadingUserItems] = useState(false);

  // Edición y Eliminación de Publicaciones como Admin
  const [editingItem, setEditingItem] = useState(null);
  const [editItemData, setEditItemData] = useState({ title: '', description: '', category: '', address: '', keepImages: [], newFiles: [] });
  const [savingItem, setSavingItem] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const showToast = (type, text) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'dev' && !user.isDev)) {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  // Cambiar rol directamente desde el selector de la tabla
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await API.put(`/admin/users/${userId}`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? res.data : u));
      showToast('success', `Rol actualizado a "${newRole}" exitosamente.`);
    } catch (err) {
      showToast('danger', err.response?.data?.msg || 'Error al cambiar rol');
    }
  };

  // Alternar activado/desactivado
  const handleToggleActive = async (userId, currentActive) => {
    try {
      const res = await API.put(`/admin/users/${userId}`, { active: !currentActive });
      setUsers(prev => prev.map(u => u._id === userId ? res.data : u));
      showToast('success', `Usuario ${!currentActive ? 'activado' : 'desactivado'} correctamente.`);
    } catch (err) {
      showToast('danger', err.response?.data?.msg || 'Error al cambiar estado');
    }
  };

  // Guardar edición de perfil del usuario
  const handleSaveUserEdit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setSavingUser(true);
    try {
      const res = await API.put(`/admin/users/${editingUser._id}`, editUserData);
      setUsers(prev => prev.map(u => u._id === editingUser._id ? res.data : u));
      setEditingUser(null);
      showToast('success', 'Usuario actualizado correctamente.');
    } catch (err) {
      showToast('danger', err.response?.data?.msg || 'Error al guardar datos');
    } finally {
      setSavingUser(false);
    }
  };

  // Ver publicaciones de un usuario
  const handleViewUserItems = async (u) => {
    setViewingUserItems(u);
    setLoadingUserItems(true);
    try {
      const res = await API.get(`/items?ownerId=${u._id}`);
      setUserItems(res.data);
    } catch (err) {
      console.error('Error al obtener ítems del usuario:', err);
    } finally {
      setLoadingUserItems(false);
    }
  };

  // Abrir modal de edición de publicación
  const handleOpenEditItem = (item) => {
    setEditingItem(item);
    setEditItemData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'plastico',
      address: item.address || '',
      keepImages: item.images || [],
      newFiles: []
    });
  };

  // Guardar edición de publicación como Admin
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
        formData.append('keepImages', '');
      }

      if (editItemData.newFiles && editItemData.newFiles.length > 0) {
        editItemData.newFiles.forEach(file => formData.append('images', file));
      }

      const res = await API.put(`/items/${editingItem._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUserItems(prev => prev.map(it => it._id === editingItem._id ? res.data : it));
      setEditingItem(null);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error al actualizar publicación');
    } finally {
      setSavingItem(false);
    }
  };

  // Confirmar eliminación de publicación
  const handleConfirmDeleteItem = async () => {
    if (!deletingItemId) return;
    try {
      await API.delete(`/items/${deletingItemId}`);
      setUserItems(prev => prev.filter(it => it._id !== deletingItemId));
      setDeletingItemId(null);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error al eliminar publicación');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || (user.role !== 'admin' && user.role !== 'dev' && !user.isDev)) return null;

  return (
    <Layout>
      <div className="dashboard-wrapper">
        <div className="dashboard-inner">

          {/* Banner de Gestión */}
          <div className="hero-banner">
            <div className="hero-banner-deco" />
            <div className="hero-banner-deco-2" />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h1 className="hero-title">Gestión Global de Usuarios</h1>
              <p className="hero-sub">
                Administra roles, modifica perfiles y revisa las publicaciones de todos los miembros.
              </p>
            </div>

            <div className="impact-pill" style={{ position: "relative", zIndex: 1 }}>
              <div>
                <p className="impact-label">Total Usuarios</p>
                <p className="impact-score">{users.length}</p>
              </div>
            </div>
          </div>

          {/* Mensajes de Feedback */}
          {feedbackMsg.text && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: '600',
                background: feedbackMsg.type === 'success' ? 'rgba(39,174,96,0.12)' : 'rgba(231,76,60,0.12)',
                color: feedbackMsg.type === 'success' ? '#27AE60' : '#E74C3C',
                border: `1px solid ${feedbackMsg.type === 'success' ? 'rgba(39,174,96,0.25)' : 'rgba(231,76,60,0.25)'}`
              }}
            >
              {feedbackMsg.text}
            </div>
          )}

          {/* Tarjeta Principal de la Tabla */}
          <div className="section-card">
            
            {/* Cabecera y Buscador */}
            <div className="section-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  className="footer-btn secondary"
                  style={{ width: 'auto', padding: '6px 14px' }}
                  onClick={() => navigate('/dashboard')}
                >
                  ← Volver
                </button>
                <h2 className="section-title">Lista General ({filteredUsers.length})</h2>
              </div>

              <input
                type="text"
                placeholder="Buscar por nombre, email o rol..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '1px solid #DEE2E6',
                  fontSize: '13px',
                  outline: 'none',
                  minWidth: '240px'
                }}
              />
            </div>

            {loading ? (
              <div className="empty-box">
                <p>Cargando usuarios...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="empty-box">
                <p className="empty-text">No se encontraron usuarios.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Usuario / Datos</th>
                      <th>Contacto</th>
                      <th>Rol Asignado</th>
                      <th>Estado</th>
                      <th style={{ textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u._id}>
                        <td>
                          <div className="admin-user-name">{u.name}</div>
                          <div className="admin-user-email">{u.email}</div>
                        </td>

                        <td>
                          <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                            {u.phone || '—'}
                          </div>
                          {u.location && (
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                              {u.location}
                            </div>
                          )}
                        </td>

                        <td>
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '8px',
                              border: '1px solid #CBD5E1',
                              fontSize: '12px',
                              fontWeight: '600',
                              outline: 'none',
                              background: u.role === 'admin' ? '#F3E8FF' : u.role === 'gestor' ? '#FEF3C7' : '#F1F5F9',
                              color: u.role === 'admin' ? '#7E22CE' : u.role === 'gestor' ? '#D97706' : '#334155'
                            }}
                          >
                            <option value="user">Usuario</option>
                            <option value="gestor">Gestor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        <td>
                          <span className={`status-badge ${u.active ? 'status-active' : 'status-inactive'}`}>
                            {u.active ? 'ACTIVO' : 'INACTIVO'}
                          </span>
                        </td>

                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="action-btn promote"
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
                            className="action-btn"
                            style={{ color: 'var(--primary)' }}
                            onClick={() => handleViewUserItems(u)}
                          >
                            <i className="bi bi-box-seam me-1"></i>Publicaciones
                          </button>

                          <button
                            type="button"
                            className={`action-btn ${u.active ? 'disable' : 'enable'}`}
                            onClick={() => handleToggleActive(u._id, u.active)}
                          >
                            {u.active ? 'Desactivar' : 'Activar'}
                          </button>
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

      {/* MODAL EDICIÓN DE USUARIO POR ADMIN */}
      {editingUser && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '16px'
          }}
        >
          <div style={{ background: '#FFF', borderRadius: '18px', width: '100%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f4c38, #16A085)', padding: '16px 20px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>Editar Perfil de {editingUser.name}</h3>
              <button type="button" onClick={() => setEditingUser(null)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveUserEdit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Nombre Completo</label>
                <input
                  type="text"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editUserData.name}
                  onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Teléfono (WhatsApp)</label>
                <input
                  type="text"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editUserData.phone}
                  onChange={e => setEditUserData({ ...editUserData, phone: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Ubicación</label>
                <input
                  type="text"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editUserData.location}
                  onChange={e => setEditUserData({ ...editUserData, location: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Rol</label>
                <select
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #DEE2E6', fontSize: '13px', outline: 'none' }}
                  value={editUserData.role}
                  onChange={e => setEditUserData({ ...editUserData, role: e.target.value })}
                >
                  <option value="user">Usuario</option>
                  <option value="gestor">Gestor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="footer-btn secondary" style={{ width: 'auto', padding: '8px 18px' }} onClick={() => setEditingUser(null)}>
                  Cancelar
                </button>
                <button type="submit" className="publish-cta" disabled={savingUser}>
                  {savingUser ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VER PUBLICACIONES DEL USUARIO (CON EDICIÓN Y ELIMINACIÓN) */}
      {viewingUserItems && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '16px'
          }}
        >
          <div style={{ background: '#FFF', borderRadius: '18px', width: '100%', maxWidth: '640px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f4c38, #16A085)', padding: '16px 20px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>Publicaciones de {viewingUserItems.name}</h3>
              <button type="button" onClick={() => setViewingUserItems(null)} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: '20px' }}>
              {loadingUserItems ? (
                <p className="text-center">Cargando publicaciones...</p>
              ) : userItems.length === 0 ? (
                <p className="empty-text text-center">Este usuario no tiene publicaciones registradas.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {userItems.map(item => (
                    <div key={item._id} style={{ padding: '14px', border: '1px solid #EAECEF', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: '#F1F5F9', overflow: 'hidden', flexShrink: 0 }}>
                          {item.images && item.images[0] ? (
                            <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '11px' }}>Sin foto</div>
                          )}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '13px', fontWeight: '600', margin: '0 0 2px' }}>{item.title}</h4>
                          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
                            Categoría: {categoryNames[item.category] || item.category} | Estado: {item.processingState}
                          </p>
                        </div>
                      </div>

                      {/* Botones de Administrador para esta publicación */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          className="action-btn promote"
                          onClick={() => handleOpenEditItem(item)}
                        >
                          <i className="bi bi-pencil me-1"></i>Editar
                        </button>

                        <button
                          type="button"
                          className="action-btn disable"
                          onClick={() => setDeletingItemId(item._id)}
                        >
                          <i className="bi bi-trash me-1"></i>Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDICIÓN DE PUBLICACIÓN POR ADMIN */}
      {editingItem && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: '16px'
          }}
        >
          <div style={{ background: '#FFF', borderRadius: '18px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
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

              {/* FOTOS */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Imágenes</label>
                {editItemData.keepImages?.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {editItemData.keepImages.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                        <img src={img} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => setEditItemData({ ...editItemData, keepImages: editItemData.keepImages.filter((_, i) => i !== idx) })}
                          style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(220,38,38,0.85)', color: '#FFF', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={e => setEditItemData({ ...editItemData, newFiles: Array.from(e.target.files) })}
                  style={{ fontSize: '12px' }}
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

      {/* CONFIRMAR ELIMINACIÓN DE PUBLICACIÓN */}
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
