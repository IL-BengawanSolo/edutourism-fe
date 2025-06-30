import React from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook register
 * @returns { register, loading, error, data }
 * register({ email, password, ... }) => Promise
 */
const useRegister = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  const register = async (values) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await axiosInstance.post("/auth/register", values);
      setData(response.data);
      return response.data;
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email sudah terdaftar.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Terjadi kesalahan saat mendaftar",
        );
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, data };
};

export default useRegister;
