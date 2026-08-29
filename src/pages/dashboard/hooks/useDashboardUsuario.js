import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import itemService from "../../../services/itemService";
import { useErrorHandler } from "../../../hooks/useErrorHandler";

export const useDashboardUsuario = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { error, isLoading, handleAsync, clearError } = useErrorHandler();

  const [myItems, setMyItems] = useState([]);
  const [nearbyItems, setNearbyItems] = useState([]);
  const [stats, setStats] = useState({ totalPublished: 0, totalValidated: 0, impactScore: 0 });

  const userId = user?.id || user?._id;

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      await handleAsync(async () => {
        const [myData, nearbyData] = await Promise.all([
          itemService.getItems({ ownerId: userId }),
          itemService.getItems({ limit: 6 })
        ]);

        if (!isMounted) return;

        setMyItems(myData);
        setNearbyItems(nearbyData.filter((item) => (item.ownerId?._id || item.ownerId) !== userId));

        setStats({
          totalPublished: myData.length,
          totalValidated: myData.filter((i) => i.processingState === "validado").length,
          impactScore: myData.length * 10,
        });
      });
    };

    if (userId) fetchDashboardData();

    return () => { isMounted = false; };
  }, [userId, handleAsync]);

  return { user, navigate, error, isLoading, clearError, myItems, nearbyItems, stats };
};

export default useDashboardUsuario;