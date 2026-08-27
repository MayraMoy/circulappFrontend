import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../services/Api";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

export const useDashboardAdmin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { error, showError, clearError } = useErrorHandler();

  const [metrics, setMetrics] = useState({ totalItems: 0, validatedItems: 0, co2Saved: 0, recyclingRate: 0, totalUsers: 0, activeGestores: 0 });
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
      showError(err.response?.data?.msg || "Error al promover usuario.");
    }
  };

  const handleToggleActive = async (userId, currentActive) => {
    try {
      await API.put(`/admin/users/${userId}`, { active: !currentActive });
      await refreshUsers();
    } catch {
      showError("Error al actualizar estado del usuario.");
    }
  };

  const exportarItems = async () => {
    try {
      const response = await API.get("/items/exportar", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "materiales.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      showError("Error al exportar materiales.");
    }
  };

  const handleDownloadReport = async (report) => {
    try {
      const response = await API.get(report.endpoint, { responseType: "blob" });
      const filename = `reporte_${report.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
      const blob = new Blob([response.data], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al descargar reporte administrativo:", err);
      showError(err.response?.data?.msg || "Error al descargar el reporte administrativo.");
    }
  };

  return { 
    user, 
    navigate, 
    error, 
    clearError, 
    metrics, 
    users, 
    items, 
    handlePromote, 
    handleToggleActive, 
    exportarItems,
    handleDownloadReport
  };
};

export default useDashboardAdmin;