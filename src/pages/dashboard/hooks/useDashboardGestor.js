import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../services/Api";

const useDashboardGestor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingItems, setPendingItems] = useState([]);
  const [toValidateItems, setToValidateItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [balingItemId, setBalingItemId] = useState(null);

  const fetchItems = useCallback(async () => {
    if (!user || user.role !== "gestor") return;

    setLoading(true);
    setError("");
    try {
      const pendingRes = await API.get("/items?processingState=sin_procesar");
      const inProgressRes = await API.get("/items?processingState=en_proceso");
      setPendingItems([...pendingRes.data, ...inProgressRes.data]);

      const toValidateRes = await API.get("/items?processingState=fardado");
      setToValidateItems(toValidateRes.data);
    } catch (err) {
      console.error("Error al cargar ítems:", err);
      setError("No se pudieron cargar los ítems. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchItems();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchItems]);

  useEffect(() => {
    if (user && user.role !== "gestor") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const confirmMarkAsBaled = async () => {
    if (!balingItemId) return;
    try {
      await API.patch(`/items/${balingItemId}/bale`);
      fetchItems();
    } catch (err) {
      alert("Error al marcar como fardado: " + (err.response?.data?.msg || "Inténtalo más tarde."));
    } finally {
      setBalingItemId(null);
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
    loading,
    error,
    balingItemId,
    setBalingItemId,
    confirmMarkAsBaled,
    getWhatsAppLink,
  };
};

export default useDashboardGestor;