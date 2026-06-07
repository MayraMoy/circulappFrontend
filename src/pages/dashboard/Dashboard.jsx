import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Dashboards por rol
import DashboardUsuario from "./DashboardUsuario";
import DashboardAdmin from "./DashboardAdmin";
import DashboardGestor from "./DashboardGestor";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirección segura (NO en render)
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Render por rol
  switch (user.role) {
    case "user":
      return <DashboardUsuario />;
    case "admin":
      return <DashboardAdmin />;
    case "gestor":
      return <DashboardGestor />;

    default:
      return (
        <div className="max-w-4xl mx-auto py-12 text-center">
          <p className="text-[var(--text-secondary)]">
            No se encontró un panel para tu rol: {user.role}
          </p>
        </div>
      );
  }
}