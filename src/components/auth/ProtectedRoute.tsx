import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface ProtectedRouteProps {
  requireAuth?: boolean;
  requireRole?: "user" | "dealer" | "admin";
}

export default function ProtectedRoute({
  requireAuth = true,
  requireRole,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !user) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
