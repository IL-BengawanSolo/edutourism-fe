import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk mengecek apakah user sudah pernah melakukan tes rekomendasi.
 * @returns { hasSession, loading, error, refetch }
 */
const useCheckRecommendationSession = () => {
  const [hasSession, setHasSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/recommendations/has-session", {
        headers: {
          Authorization: token,
        },
      });
      setHasSession(res.data.hasSession);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal cek sesi rekomendasi"
      );
      setHasSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return { hasSession, loading, error, refetch: fetchSession };
};

export default useCheckRecommendationSession;