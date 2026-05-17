import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Layout from '../../components/Layout';
import API from '../../services/Api'; 
import { useNavigate } from 'react-router-dom';

const isValidPhone = (phone) => {
  const clean = phone.replace(/\D/g, '');
  return /^54[1-9]\d{9,11}$/.test(clean);
};

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

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

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user?.id) return setLoading(false);

      try {
        const res = await API.get(`/items?ownerId=${user.id}`);
        setMyItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar publicación?')) return;

    try {
      await API.delete(`/items/${id}`);
      setMyItems(prev => prev.filter(i => i._id !== id));
    } catch {
      alert('Error al eliminar');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (profileData.phone && !isValidPhone(profileData.phone)) {
      return alert('Teléfono inválido');
    }

    try {
      const payload = {
        ...profileData,
        phone: profileData.phone.replace(/\D/g, '')
      };

      const res = await API.put('/users/profile', payload);
      updateUser(res.data);
      setEditMode(false);
    } catch {
      alert('Error al guardar');
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          className="p-6 rounded-xl mb-6"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
            color: "#fff"
          }}
        >
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="opacity-90">{user.email}</p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          {['profile', 'products', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-sm"
              style={{
                color: activeTab === tab ? "var(--primary)" : "var(--text-secondary)",
                borderBottom: activeTab === tab ? "2px solid var(--primary)" : "none"
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: "var(--background-paper)",
            border: "0.5px solid color-mix(in srgb, var(--primary) 15%, transparent)"
          }}
        >

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <>
              {!editMode ? (
                <div className="space-y-3">
                  <p><b>Nombre:</b> {user.name}</p>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>Teléfono:</b> {user.phone || '—'}</p>

                  <button
                    onClick={() => setEditMode(true)}
                    style={{ color: "var(--primary)" }}
                  >
                    Editar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-4">

                  <input
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="+54..."
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 rounded text-white"
                    style={{ background: "var(--primary)" }}
                  >
                    Guardar
                  </button>

                </form>
              )}
            </>
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && (
            <>
              {loading ? (
                <p>Cargando...</p>
              ) : myItems.length === 0 ? (
                <p>No tenés publicaciones</p>
              ) : (
                myItems.map(item => (
                  <div key={item._id} className="border p-3 rounded mb-2">
                    <div className="flex justify-between">
                      <span>{item.title}</span>
                      <button onClick={() => handleDelete(item._id)}>🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              style={{ color: "var(--error)" }}
            >
              Cerrar sesión
            </button>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default Profile;