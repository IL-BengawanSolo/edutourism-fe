import { useState, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk membuat sesi rekomendasi baru.
 * @returns { postSession, loading, error, data }
 */
const usePostRecommendationSession = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postSession = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/recommendations/sessions",
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setData(res.data.data);
      return res.data.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal membuat sesi rekomendasi",
      );
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postSession, loading, error, data };
};

export default usePostRecommendationSession;
