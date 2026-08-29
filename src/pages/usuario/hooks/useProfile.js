import { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import API from '../../../services/Api';
import itemService from '../../../services/itemService';

export default function useProfile() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromQuery = searchParams.get('tab');
  const activeTab = tabFromQuery || 'profile';

  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProfileMode, setEditProfileMode] = useState(false);

  // Modales
  const [editingItem, setEditingItem] = useState(null);
  const [editItemData, setEditItemData] = useState({ title: '', description: '', category: '', address: '' });
  const [savingItem, setSavingItem] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Perfil
  const [profileData, setProfileData] = useState({ name: '', email: '', phone: '', location: '', bio: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });

  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!user) return navigate('/login');

    setProfileData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || ''
    });
  }, [userId, navigate]);

  const fetchUserItems = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await itemService.getItems({ ownerId: userId });
      setMyItems(data);
    } catch (err) {
      console.error('Error al cargar publicaciones:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserItems();
  }, [fetchUserItems]);

  const confirmDeleteItem = async () => {
    if (!deletingItemId) return;
    try {
      await itemService.deleteItem(deletingItemId);
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
        formData.append('keepImages', '');
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

  return {
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
  };
}