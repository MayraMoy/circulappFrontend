import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import API from '../../../services/Api';
import itemService from '../../../services/itemService';

export const CATEGORY_NAMES = {
  plastico: 'Plástico',
  papel: 'Papel y Cartón',
  vidrio: 'Vidrio',
  metal: 'Metal',
  textil: 'Textil',
  electronico: 'Electrónico',
  otro: 'Otro'
};

const useAdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });

  // Modales de Usuario
  const [editingUser, setEditingUser] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: '',
    phone: '',
    location: '',
    role: 'user',
    active: true
  });
  const [savingUser, setSavingUser] = useState(false);

  // Modal Ver Publicaciones
  const [viewingUserItems, setViewingUserItems] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [loadingUserItems, setLoadingUserItems] = useState(false);

  // Edición y Eliminación de Publicaciones
  const [editingItem, setEditingItem] = useState(null);
  const [editItemData, setEditItemData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    keepImages: [],
    newFiles: []
  });
  const [savingItem, setSavingItem] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const showToast = (type, text) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'dev' && !user.isDev)) {
      navigate('/dashboard');
      return;
    }
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [user, navigate, fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await API.put(`/admin/users/${userId}`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? res.data : u));
      showToast('success', `Rol actualizado a "${newRole}" exitosamente.`);
    } catch (err) {
      showToast('danger', err.response?.data?.msg || 'Error al cambiar rol');
    }
  };

  const handleToggleActive = async (userId, currentActive) => {
    try {
      const res = await API.put(`/admin/users/${userId}`, { active: !currentActive });
      setUsers(prev => prev.map(u => u._id === userId ? res.data : u));
      showToast('success', `Usuario ${!currentActive ? 'activado' : 'desactivado'} correctamente.`);
    } catch (err) {
      showToast('danger', err.response?.data?.msg || 'Error al cambiar estado');
    }
  };

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

  const handleViewUserItems = async (u) => {
    setViewingUserItems(u);
    setLoadingUserItems(true);
    try {
      const items = await itemService.getItems({ ownerId: u._id });
      setUserItems(items);
    } catch (err) {
      console.error('Error al obtener ítems del usuario:', err);
      setUserItems([]);
    } finally {
      setLoadingUserItems(false);
    }
  };

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
      showToast('success', 'Publicación actualizada correctamente.');
    } catch (err) {
      showToast('danger', err.response?.data?.msg || 'Error al actualizar publicación');
    } finally {
      setSavingItem(false);
    }
  };

  const handleConfirmDeleteItem = async () => {
    if (!deletingItemId) return;
    try {
      await API.delete(`/items/${deletingItemId}`);
      setUserItems(prev => prev.filter(it => it._id !== deletingItemId));
      setDeletingItemId(null);
      showToast('success', 'Publicación eliminada correctamente.');
    } catch (err) {
      showToast('danger', err.response?.data?.msg || 'Error al eliminar publicación');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
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
  };
};

export default useAdminUsers;