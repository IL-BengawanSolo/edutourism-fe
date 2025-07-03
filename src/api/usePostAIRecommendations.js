import { useState, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk POST rekomendasi AI.
 * @returns { postRecommendations, loading, error, data }
 */
const usePostAIRecommendations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRecommendations = useCallback(
    async ({ preferred_categories, n, session_id }) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.post(
          "/recommendations/ai",
          { preferred_categories, n, session_id },
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
            "Gagal mendapatkan rekomendasi AI",
        );
        setData(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { postRecommendations, loading, error, data };
};

export default usePostAIRecommendations;
