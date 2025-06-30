// GuestRoute.jsx
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user, checking } = useAuth();
  if (checking) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default GuestRoute;