import React from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk login JWT.
 * @returns { login, loading, error, data }
 * login({ email, password }) => Promise
 */
const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data.data;
      setData(user);
      return { token, user };
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Email atau kata sandi salah.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Terjadi kesalahan saat login"
        );
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, data };
};

export default useLogin;