import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../contexts/hooks/useAuth';
import LoadingSpinner from '../components/feedback/LoadingSpinner';

export default function RoleRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
