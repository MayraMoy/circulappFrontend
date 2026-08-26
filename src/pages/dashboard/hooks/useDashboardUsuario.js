import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../services/Api";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

export const useDashboardUsuario = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { error, isLoading, handleAsync, clearError } = useErrorHandler();

  const [myItems, setMyItems] = useState([]);
  const [nearbyItems, setNearbyItems] = useState([]);
  const [stats, setStats] = useState({ totalPublished: 0, totalValidated: 0, impactScore: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      await handleAsync(async () => {
        const myRes = await API.get(`/items?ownerId=${user.id}`);
        setMyItems(myRes.data);

        const nearbyRes = await API.get("/items?limit=6");
        setNearbyItems(nearbyRes.data.filter((item) => item.ownerId?._id !== user.id));

        setStats({
          totalPublished: myRes.data.length,
          totalValidated: myRes.data.filter((i) => i.processingState === "validado").length,
          impactScore: myRes.data.length * 10,
        });
      });
    };
    if (user) fetchDashboardData();
  }, [user, handleAsync]);

  return { user, navigate, error, isLoading, clearError, myItems, nearbyItems, stats };
};

export default useDashboardUsuario;