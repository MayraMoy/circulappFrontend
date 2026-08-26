import {
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";

import AuthContext from "../../contexts/AuthContext";
import Layout from "../../components/layout/Layout";
import API from "../../services/Api";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/feedback/ConfirmModal";
import StateBadge from "../../components/badges/StateBadge";

import {
  IconPackage,
  IconChevron,
  IconLeaf,
  IconBox
} from "../../components/Icons";

import "./Dashboard.css";

const categoryNames = {
  plastico: 'Plástico', papel: 'Papel y Cartón', vidrio: 'Vidrio',
  metal: 'Metal', textil: 'Textil', electronico: 'Electrónico', otro: 'Otro'
};

const DashboardGestor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' o 'toValidate'
  const [pendingItems, setPendingItems] = useState([]);
  const [toValidateItems, setToValidateItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estado para el modal personalizado de fardado
  const [balingItemId, setBalingItemId] = useState(null);

  const fetchItems = useCallback(async () => {
    if (!user || user.role !== 'gestor') return;

    setLoading(true);
    setError('');
    try {
      // Ítems pendientes de procesar (sin_procesar, en_proceso)
      const pendingRes = await API.get('/items?processingState=sin_procesar');
      const inProgressRes = await API.get('/items?processingState=en_proceso');
      setPendingItems([...pendingRes.data, ...inProgressRes.data]);

      // Ítems listos para validar (fardado)
      const toValidateRes = await API.get('/items?processingState=fardado');
      setToValidateItems(toValidateRes.data);
    } catch (err) {
      console.error('Error al cargar ítems:', err);
      setError('No se pudieron cargar los ítems. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const confirmMarkAsBaled = async () => {
    if (!balingItemId) return;
    try {
      await API.patch(`/items/${balingItemId}/bale`);
      fetchItems(); // Recargar ambas listas
    } catch (err) {
      alert('Error al marcar como fardado: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    } finally {
      setBalingItemId(null);
    }
  };

  useEffect(() => {
    if (user && user.role !== "gestor") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (!user) return null;

  const getWhatsAppLink = (phone) => {
    if (!phone) return null;
    const clean = phone.replace(/\D/g, '');
    if (!clean) return null;
    const formatted = clean.startsWith('54') ? clean : `54${clean}`;
    return `https://wa.me/${formatted}`;
  };

  const tabs = [
    { id: 'pending', name: 'Ítems Pendientes de Procesamiento' },
    { id: 'toValidate', name: 'Fardos Pendientes de Validación' }
  ];

  return (
    <Layout>
      <div className="dashboard-wrapper">
        <div className="dashboard-inner">

          {/* Hero */}
          <div className="hero-banner">
            <div className="hero-banner-deco" />
            <div className="hero-banner-deco-2" />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h1 className="hero-title">
                Panel de Gestión de Materiales
              </h1>

              <p className="hero-sub">
                Gestiona el procesamiento, recolección y validación de materiales reciclables.
              </p>
            </div>

            <div
              className="impact-pill"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div>
                <p className="impact-label">
                  Materiales pendientes
                </p>

                <p className="impact-score">
                  {pendingItems.length}
                </p>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="stat-grid">

            <div className="stat-card">
              <div
                className="stat-icon-wrap"
                style={{
                  background: "rgba(22,160,133,.12)"
                }}
              >
                <IconPackage />
              </div>

              <p className="stat-value">
                {pendingItems.length}
              </p>

              <p className="stat-label">
                Pendientes
              </p>

              <p className="stat-sub">
                Materiales por procesar
              </p>
            </div>

            <div className="stat-card">
              <div
                className="stat-icon-wrap"
                style={{
                  background: "rgba(243,156,18,.12)"
                }}
              >
                <IconBox />
              </div>

              <p className="stat-value">
                {toValidateItems.length}
              </p>

              <p className="stat-label">
                Fardos
              </p>

              <p className="stat-sub">
                Pendientes de validación
              </p>
            </div>

            <div className="stat-card">
              <div
                className="stat-icon-wrap"
                style={{
                  background: "rgba(39,174,96,.12)"
                }}
              >
                <IconLeaf />
              </div>

              <p className="stat-value">
                {pendingItems.length + toValidateItems.length}
              </p>

              <p className="stat-label">
                Total
              </p>

              <p className="stat-sub">
                Materiales gestionados
              </p>
            </div>

          </div>

          {error && (
            <div className="section-card">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="section-card">
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`footer-btn ${
                    activeTab === tab.id
                      ? "primary"
                      : "secondary"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 16 }} />

          {loading ? (
            <div className="section-card text-center py-4">
              <p>Cargando materiales...</p>
            </div>
          ) : activeTab === "pending" ? (

            <div className="section-card">

              <div className="section-header">
                <h2 className="section-title">
                  Ítems Pendientes de Procesamiento ({pendingItems.length})
                </h2>

                <button
                  className="link-btn"
                  onClick={() =>
                    navigate("/search?processingState=sin_procesar")
                  }
                >
                  Ver todos
                  <IconChevron />
                </button>
              </div>

              {pendingItems.length === 0 ? (
                <div className="empty-box">
                  <div className="empty-icon">
                    <IconPackage />
                  </div>

                  <p className="empty-text">
                    No hay materiales pendientes.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pendingItems.map(item => (
                    <div
                      key={item._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                        padding: '16px',
                        borderRadius: '14px',
                        border: '1px solid #EAECEF',
                        background: '#FFFFFF'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '260px' }}>
                        <div 
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            background: '#F0F2F5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}
                        >
                          {item.images && item.images[0] ? (
                            <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <IconPackage />
                          )}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{item.title}</h3>
                            <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>
                              {categoryNames[item.category] || item.category}
                            </span>
                            <StateBadge state={item.processingState} />
                          </div>

                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 2px' }}>
                            <strong>Publicado por:</strong> {item.ownerId?.name || "Usuario"} {item.ownerId?.email ? `(${item.ownerId.email})` : ''}
                          </p>

                          {item.address && (
                            <p style={{ fontSize: '11px', color: 'var(--primary)', margin: 0 }}>
                              📍 {item.address}
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.ownerId?.phone && getWhatsAppLink(item.ownerId.phone) && (
                          <a
                            href={getWhatsAppLink(item.ownerId.phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: '#25D366',
                              color: '#FFFFFF',
                              padding: '8px 14px',
                              borderRadius: '10px',
                              fontSize: '12px',
                              fontWeight: '600',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            WhatsApp
                          </a>
                        )}

                        <button
                          type="button"
                          className="publish-cta"
                          style={{ padding: '8px 16px', fontSize: '12px' }}
                          onClick={() => setBalingItemId(item._id)}
                        >
                          Marcar Fardado
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          ) : (

            <div className="section-card">

              <div className="section-header">
                <h2 className="section-title">
                  Fardos Pendientes de Validación ({toValidateItems.length})
                </h2>

                <button
                  className="link-btn"
                  onClick={() =>
                    navigate("/search?processingState=fardado")
                  }
                >
                  Ver todos
                  <IconChevron />
                </button>
              </div>

              {toValidateItems.length === 0 ? (
                <div className="empty-box">
                  <div className="empty-icon">
                    <IconBox />
                  </div>

                  <p className="empty-text">
                    No hay fardos pendientes.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {toValidateItems.map(item => (
                    <div
                      key={item._id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                        padding: '16px',
                        borderRadius: '14px',
                        border: '1px solid #EAECEF',
                        background: '#FFFFFF'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '260px' }}>
                        <div 
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            background: '#F0F2F5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}
                        >
                          {item.images && item.images[0] ? (
                            <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <IconBox />
                          )}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{item.title}</h3>
                            <StateBadge state={item.processingState} />
                          </div>

                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                            <strong>Categoría:</strong> {categoryNames[item.category] || item.category}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="publish-cta"
                        style={{ padding: '8px 20px', fontSize: '12px' }}
                        onClick={() => navigate(`/validate?itemId=${item._id}`)}
                      >
                        Validar Fardo
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>

          )}

          {/* Accesos rápidos */}
          <div
            className="main-grid"
            style={{ marginTop: "16px" }}
          >
            <div
              className="section-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/agenda")}
            >
              <h3 className="section-title">
                Agenda de Recolección
              </h3>

              <p className="item-subtitle">
                Crear y gestionar rutas optimizadas.
              </p>
            </div>

            <div
              className="section-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/historial")}
            >
              <h3 className="section-title">
                Archivo Histórico
              </h3>

              <p className="item-subtitle">
                Historial de validaciones y movimientos.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL PERSONALIZADO DE CONFIRMACIÓN DE FARDADO */}
      <ConfirmModal
        isOpen={Boolean(balingItemId)}
        title="Confirmar Fardado de Material"
        message="¿Deseas marcar este material como fardado para pasarlo a la etapa de validación?"
        confirmText="Marcar como Fardado"
        cancelText="Cancelar"
        type="success"
        onConfirm={confirmMarkAsBaled}
        onCancel={() => setBalingItemId(null)}
      />
    </Layout>
  );
};

export default DashboardGestor;