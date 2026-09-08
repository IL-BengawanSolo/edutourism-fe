import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PageLoader from "../ui/PageLoader.jsx";

const GuestRoute = ({ children }) => {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return <PageLoader message="Checking authentication..." />;

  if (user) {
    const params = new URLSearchParams(location.search);
    let redirect = "/";
    const raw = params.get("redirect");
    if (raw) {
      try {
        const decoded = decodeURIComponent(raw);
        // Whitelist: only allow same-origin relative paths
        if (
          decoded.startsWith("/") &&
          !decoded.startsWith("//") &&
          !decoded.includes(":")
        ) {
          redirect = decoded;
        }
      } catch {
        redirect = "/";
      }
    }
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default GuestRoute;
