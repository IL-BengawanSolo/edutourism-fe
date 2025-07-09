import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk fetch sesi rekomendasi terakhir user.
 * @returns { session, loading, error, refetch }
 */
const useFetchLastRecommendationSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setSession(null);
      setLoading(false);
      return;
    }
    try {
      const res = await axiosInstance.get("/recommendations/last-session", {
        headers: {
          Authorization: token,
        },
      });
      setSession(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil sesi rekomendasi terakhir"
      );
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { session, loading, error, refetch: fetchSession };
};

export default useFetchLastRecommendationSession;