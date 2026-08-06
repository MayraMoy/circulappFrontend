// Este archivo define una ruta protegida en la aplicación. La ruta protegida verifica si el usuario está autenticado 
// antes de permitir el acceso a los componentes hijos.

import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../contexts/hooks/useAuth";
import LoadingSpinner from "../components/feedback/LoadingSpinner";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}