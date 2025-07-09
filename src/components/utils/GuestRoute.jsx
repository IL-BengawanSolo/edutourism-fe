import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return null;

  if (user) {
    // Ambil redirect dari query string, fallback ke "/"
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect")
      ? decodeURIComponent(params.get("redirect"))
      : "/";
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default GuestRoute;