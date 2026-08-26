import { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../services/Api";

export const useDashboardGestor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingItems, setPendingItems] = useState([]);
  const [toValidateItems, setToValidateItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    if (!user || user.role !== "gestor") return;
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
    let ignore = false;

    const loadData = async () => {
      if (!user || user.role !== "gestor") return;
      setError("");
      try {
        const pendingRes = await API.get("/items?processingState=sin_procesar");
        const inProgressRes = await API.get("/items?processingState=en_proceso");
        const toValidateRes = await API.get("/items?processingState=fardado");

        if (!ignore) {
          setPendingItems([...pendingRes.data, ...inProgressRes.data]);
          setToValidateItems(toValidateRes.data);
        }
      } catch (err) {
        console.error("Error al cargar ítems:", err);
        if (!ignore) setError("No se pudieron cargar los ítems. Inténtalo más tarde.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, [user]);

  useEffect(() => {
    if (user && user.role !== "gestor") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleMarkAsBaled = async (itemId) => {
    if (window.confirm("¿Marcar este material como fardado?")) {
      try {
        await API.patch(`/items/${itemId}/bale`);
        fetchItems();
      } catch (err) {
        alert("Error al marcar como fardado: " + (err.response?.data?.msg || "Inténtalo más tarde."));
      }
    }
  };

  return { user, navigate, activeTab, setActiveTab, pendingItems, toValidateItems, loading, error, handleMarkAsBaled };
};

export default useDashboardGestor;