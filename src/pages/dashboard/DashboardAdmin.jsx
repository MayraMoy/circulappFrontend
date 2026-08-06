import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Layout from "../../components/Layout/Layout";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import ErrorToast from "../../components/feedback/ErrorToast";
import API from "../../services/Api";
import { useNavigate } from "react-router-dom";

import {
    IconBox,
    IconCheck,
    IconClock,
    IconPackage,
    IconPin,
    IconPlus,
    IconSearch,
    IconChevron,
    IconImagePlaceholder,
    IconLeaf
} from "../../components/Icons";
import IconReport from "../icons/IconReport";
import IconUsers from "../icons/IconUsers";

import "./Dashboard.css";

const DashboardAdmin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { error, showError, clearError } = useErrorHandler();

  const [metrics, setMetrics] = useState({
    totalItems: 0,
    validatedItems: 0,
    co2Saved: 0,
    recyclingRate: 0,
    totalUsers: 0,
    activeGestores: 0,
  });

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || user.role !== "admin") {
        navigate("/dashboard");
        return;
      }

      try {
        const [metricsRes, usersRes, itemsRes] = await Promise.all([
          API.get("/admin/metrics"),
          API.get("/admin/users"),
          API.get("/admin/items"),
        ]);

        setMetrics(metricsRes.data);
        setUsers(usersRes.data);
        setItems(itemsRes.data);
      } catch (err) {
        console.error("Error al cargar datos del administrador:", err);
        showError("Error al cargar el panel de administración.");
      }
    };

    fetchData();
  }, [user, navigate, showError]);

  const refreshUsers = async () => {
    try {
      const response = await API.get("/admin/users");
      setUsers(response.data);
    } catch {
      showError("Error al actualizar usuarios.");
    }
  };

  const handlePromote = async (userId) => {
    try {
      await API.post(`/admin/users/${userId}/promote`);
      await refreshUsers();
    } catch (err) {
      showError(
        err.response?.data?.msg || "Error al promover usuario."
      );
    }
  };

  const handleToggleActive = async (userId, currentActive) => {
    try {
      await API.put(`/admin/users/${userId}`, {
        active: !currentActive,
      });

      await refreshUsers();
    } catch {
      showError("Error al actualizar estado del usuario.");
    }
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  const exportarItems = async () => {
  try {
    const response = await API.get('/items/exportar', {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'materiales.xlsx');

    document.body.appendChild(link);
    link.click();

    link.remove();
  } catch (error) {
    console.error(error);
  }
};
  const statCards = [
    {
      label: "Usuarios",
      value: metrics.totalUsers,
      sub: "registrados",
      accent: "var(--primary)",
      iconBg: "rgba(22,160,133,0.12)",
      iconColor: "var(--primary)",
      icon: <IconUsers />,
    },
    {
      label: "Materiales",
      value: metrics.totalItems,
      sub: "publicados",
      accent: "var(--secondary)",
      iconBg: "rgba(243,156,18,0.12)",
      iconColor: "var(--secondary-dark)",
      icon: <IconBox />,
    },
    {
      label: "Validados",
      value: metrics.validatedItems,
      sub: "certificados",
      accent: "var(--success)",
      iconBg: "rgba(39,174,96,0.12)",
      iconColor: "var(--success)",
      icon: <IconCheck />,
    },
  ];

  return (
    <Layout>
      <ErrorToast error={error} onClose={clearError} />

      <div className="dashboard-wrapper">
        <div className="dashboard-inner">

          {/* HERO */}
          <div className="hero-banner">
            <div className="hero-banner-deco" />
            <div className="hero-banner-deco-2" />

            <div style={{ position: "relative" }}>
              <h1 className="hero-title">
                Panel de Administración
              </h1>

              <p className="hero-sub">
                Gestión centralizada de usuarios, materiales y reportes.
              </p>
            </div>

            <div
              className="impact-pill"
              style={{ position: "relative" }}
            >
              <div style={{ color: "#A8F0C6" }}>
                <IconLeaf />
              </div>

              <div>
                <p className="impact-label">
                  CO₂ Ahorrado
                </p>

                <p className="impact-score">
                  {metrics.co2Saved} kg
                </p>
              </div>
            </div>
          </div>

          {/* MÉTRICAS */}
          <div className="stat-grid">
            {statCards.map(
              ({
                label,
                value,
                sub,
                accent,
                iconBg,
                iconColor,
                icon,
              }) => (
                <div
                  key={label}
                  className="stat-card"
                  style={{
                    borderTop: `3px solid ${accent}`,
                  }}
                >
                  <div
                    className="stat-icon-wrap"
                    style={{
                      background: iconBg,
                      color: iconColor,
                    }}
                  >
                    {icon}
                  </div>

                  <p className="stat-value">
                    {value}
                  </p>

                  <p className="stat-label">
                    {label}
                  </p>

                  <p className="stat-sub">
                    {sub}
                  </p>
                </div>
              )
            )}
          </div>

          {/* CONTENIDO */}
          <div className="main-grid">

            {/* USUARIOS */}
            <div className="section-card">
              <div className="section-header">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                  }}
                >
                  <div className="section-icon-wrap">
                    <IconUsers />
                  </div>

                  <h2 className="section-title">
                    Gestión de Usuarios
                  </h2>
                </div>

                <button
                  className="link-btn"
                  onClick={() =>
                    navigate("/admin/users")
                  }
                >
                  Ver todos <IconChevron />
                </button>
              </div>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {users.slice(0, 5).map((u) => (
                    <tr key={u._id}>
                      <td>
                        <div className="admin-user-name">
                          {u.name}
                        </div>

                        <div className="admin-user-email">
                          {u.email}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`role-badge ${
                            u.role === "admin"
                              ? "role-admin"
                              : u.role === "gestor"
                              ? "role-gestor"
                              : "role-user"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td>
                        {u.role === "user" && (
                          <button
                            onClick={() =>
                              handlePromote(u._id)
                            }
                            className="action-btn promote"
                          >
                            Promover
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleToggleActive(
                              u._id,
                              u.active
                            )
                          }
                          className={`action-btn ${
                            u.active
                              ? "disable"
                              : "enable"
                          }`}
                        >
                          {u.active
                            ? "Desactivar"
                            : "Activar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MATERIALES */}
            <div className="section-card">
              <div className="section-header">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                  }}
                >
                  <div className="section-icon-wrap">
                    <IconPackage />
                  </div>

                  <h2 className="section-title">
                    Trazabilidad de Materiales
                  </h2>
                </div>

                <button
                  type="button"
                  className="link-btn"
                  onClick={exportarItems}
                >
  Exportar <IconChevron />
</button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {items.slice(0, 5).map((item) => (
                  <div
                    key={item._id}
                    className="item-row"
                  >
                    <div
                      className="img-thumb"
                    >
                      <IconPackage />
                    </div>

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <p className="item-title">
                        {item.title}
                      </p>

                      <p className="item-subtitle">
                        {item.category}
                      </p>

                      <p className="item-subtitle">
                        Estado:{" "}
                        {item.processingState}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="section-divider">
                <button
                  className="footer-btn primary"
                >
                  Total: {metrics.totalItems} materiales
                </button>
              </div>
            </div>
          </div>

          {/* REPORTES */}
          <div
            className="section-card"
            style={{ marginTop: "1rem" }}
          >
            <div className="section-header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <div className="section-icon-wrap">
                  <IconReport />
                </div>

                <h2 className="section-title">
                  Reportes para la Comuna
                </h2>
              </div>
            </div>

            <div className="report-grid">
              <div
                className="report-card"
                onClick={() =>
                  window.open(
                    "/api/admin/reports/monthly",
                    "_blank"
                  )
                }
              >
                <div className="report-title">
                  Reporte Mensual
                </div>

                <div className="report-subtitle">
                  Resumen general de actividad.
                </div>
              </div>

              <div
                className="report-card"
                onClick={() =>
                  window.open(
                    "/api/admin/reports/environmental",
                    "_blank"
                  )
                }
              >
                <div className="report-title">
                  Reporte Ambiental
                </div>

                <div className="report-subtitle">
                  CO₂ ahorrado y reciclaje.
                </div>
              </div>

              <div
                className="report-card"
                onClick={() =>
                  window.open(
                    "/api/admin/reports/validations",
                    "_blank"
                  )
                }
              >
                <div className="report-title">
                  Reporte de Validaciones
                </div>

                <div className="report-subtitle">
                  Materiales certificados.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default DashboardAdmin;