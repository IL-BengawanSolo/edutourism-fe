import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
const AuthContext = createContext();
import { validateToken } from "@/api/validateToken";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setChecking(false);
      return;
    }
    try {
      const user = await validateToken(token);
      setUser(user);
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Fungsi login: simpan token & fetch user
  const login = useCallback(
    async (token) => {
      localStorage.setItem("token", token);
      setChecking(true);
      await fetchUser();
    },
    [fetchUser],
  );

  // Fungsi logout: hapus token & user
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
