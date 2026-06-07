import {
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";

import { AuthContext } from "../../contexts/AuthContext";
import Layout from "../../components/Layout";
import API from "../../services/Api";
import { useNavigate } from "react-router-dom";

import {
  IconPackage,
  IconChevron,
  IconLeaf,
  IconBox
} from "../../components/Icons";

import "./Dashboard.css";

const DashboardGestor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' o 'toValidate'
  const [pendingItems, setPendingItems] = useState([]);
  const [toValidateItems, setToValidateItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleMarkAsBaled = async (itemId) => {
    if (window.confirm('¿Marcar este material como fardado?')) {
      try {
        await API.patch(`/items/${itemId}/bale`);
        fetchItems(); // Recargar ambas listas
      } catch (err) {
        alert('Error al marcar como fardado: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
      }
    }
  };

  useEffect(() => {
    if (user && user.role !== "gestor") {
        navigate("/dashboard");
        }
    }, [user, navigate]);

if (!user) return null;

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
              Gestiona el procesamiento y validación de materiales reciclables.
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
          <div className="section-card">
            <p>Cargando materiales...</p>
          </div>
        ) : activeTab === "pending" ? (

          <div className="section-card">

            <div className="section-header">
              <h2 className="section-title">
                Ítems Pendientes de Procesamiento
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
              pendingItems.map(item => (
                <div
                  key={item._id}
                  className="item-row"
                >
                  <div className="img-thumb">
                    <IconPackage />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0
                    }}
                  >
                    <p className="item-title">
                      {item.title}
                    </p>

                    <p className="item-subtitle">
                      Estado: {item.processingState}
                    </p>

                    <p className="item-subtitle">
                      {item.address ||
                        (
                          item.location?.lat &&
                          item.location?.lng
                        )
                          ? `${item.location?.lat?.toFixed(4)}, ${item.location?.lng?.toFixed(4)}`
                          : ""}
                    </p>
                  </div>

                  <button
                    className="footer-btn primary"
                    style={{ width: "auto" }}
                    onClick={() =>
                      handleMarkAsBaled(item._id)
                    }
                  >
                    Marcar Fardado
                  </button>
                </div>
              ))
            )}

          </div>

        ) : (

          <div className="section-card">

            <div className="section-header">
              <h2 className="section-title">
                Fardos Pendientes de Validación
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
              toValidateItems.map(item => (
                <div
                  key={item._id}
                  className="item-row"
                >
                  <div className="img-thumb">
                    <IconBox />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0
                    }}
                  >
                    <p className="item-title">
                      {item.title}
                    </p>

                    <p className="item-subtitle">
                      {item.category}
                    </p>
                  </div>

                  <button
                    className="footer-btn primary"
                    style={{ width: "auto" }}
                    onClick={() =>
                      navigate(`/validate?itemId=${item._id}`)
                    }
                  >
                    Validar
                  </button>
                </div>
              ))
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
  </Layout>
  );
}
export default DashboardGestor;