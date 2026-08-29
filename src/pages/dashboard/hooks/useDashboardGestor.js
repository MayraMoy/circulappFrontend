import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../services/Api";
import itemService from "../../../services/itemService";

const useDashboardGestor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingItems, setPendingItems] = useState([]);
  const [toValidateItems, setToValidateItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [balingItemId, setBalingItemId] = useState(null);

  const [reports, setReports] = useState([]);
  const [pendingReportsCount, setPendingReportsCount] = useState(0);
  const [loadingReports, setLoadingReports] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchReports = useCallback(async () => {
    if (!user || (user.role !== "gestor" && user.role !== "admin")) return;
    setLoadingReports(true);
    try {
      const res = await API.get("/reports");
      setReports(res.data.reports || []);
      setPendingReportsCount(res.data.pendingCount || 0);
    } catch (err) {
      console.error("Error al cargar denuncias:", err);
    } finally {
      setLoadingReports(false);
    }
  }, [user?.role]);

  const fetchItems = useCallback(async () => {
    if (!user || user.role !== "gestor") return;

    setLoading(true);
    setError("");
    try {
      // Consulta unificada de todos los estados gestionables en una sola petición (P-036)
      const allGestorItems = await itemService.getItems({ processingState: 'sin_procesar,en_proceso,fardado' });

      setPendingItems(allGestorItems.filter(i => i.processingState === 'sin_procesar' || i.processingState === 'en_proceso'));
      setToValidateItems(allGestorItems.filter(i => i.processingState === 'fardado'));
      await fetchReports();
    } catch (err) {
      console.error("Error al cargar ítems:", err);
      setError("No se pudieron cargar los ítems. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  }, [user?.role, fetchReports]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (user && user.role !== "gestor") {
      navigate("/dashboard");
    }
  }, [user?.role, navigate]);

  const confirmMarkAsBaled = async () => {
    if (!balingItemId) return;
    try {
      await itemService.markAsBaled(balingItemId);
      fetchItems();
    } catch (err) {
      alert("Error al marcar como fardado: " + (err.response?.data?.msg || "Inténtalo más tarde."));
    } finally {
      setBalingItemId(null);
    }
  };

  const handleDismissReport = async (reportId) => {
    setActionLoadingId(reportId);
    try {
      await API.patch(`/reports/${reportId}/dismiss`, { resolutionNotes: 'Desestimada por el gestor comunal.' });
      await fetchReports();
    } catch (err) {
      alert("Error al desestimar la denuncia: " + (err.response?.data?.msg || "Error"));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteReportedItem = async (reportId) => {
    if (!window.confirm("¿Confirmas que deseas eliminar esta publicación infractora permanentemente?")) return;
    setActionLoadingId(reportId);
    try {
      await API.delete(`/reports/${reportId}/item`);
      await Promise.all([fetchReports(), fetchItems()]);
    } catch (err) {
      alert("Error al eliminar la publicación denunciada: " + (err.response?.data?.msg || "Error"));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeactivateReportedUser = async (reportId, userName) => {
    if (!window.confirm(`¿Confirmas que deseas desactivar/suspender la cuenta de ${userName || 'este usuario'}?`)) return;
    setActionLoadingId(reportId);
    try {
      await API.patch(`/reports/${reportId}/deactivate-user`);
      await Promise.all([fetchReports(), fetchItems()]);
    } catch (err) {
      alert("Error al desactivar al usuario denunciado: " + (err.response?.data?.msg || "Error"));
    } finally {
      setActionLoadingId(null);
    }
  };

  const getWhatsAppLink = (phone) => {
    if (!phone) return null;
    const clean = phone.replace(/\D/g, "");
    if (!clean) return null;
    const formatted = clean.startsWith("54") ? clean : `54${clean}`;
    return `https://wa.me/${formatted}`;
  };

  return {
    user,
    navigate,
    activeTab,
    setActiveTab,
    pendingItems,
    toValidateItems,
    reports,
    pendingReportsCount,
    loadingReports,
    actionLoadingId,
    loading,
    error,
    balingItemId,
    setBalingItemId,
    confirmMarkAsBaled,
    handleDismissReport,
    handleDeleteReportedItem,
    handleDeactivateReportedUser,
    getWhatsAppLink,
  };
};

export default useDashboardGestor;