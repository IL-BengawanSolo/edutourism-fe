import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../ui/PageLoader.jsx";

const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireSuperAdmin = false,
}) => {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return <PageLoader message="Checking authentication..." />;

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (requireSuperAdmin && user.role !== "super_admin") {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user.role !== "admin" && user.role !== "super_admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
