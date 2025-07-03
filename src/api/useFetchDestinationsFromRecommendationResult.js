import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk fetch destinasi dari hasil rekomendasi berdasarkan session_id.
 * @param {string} sessionId
 * @returns { destinations, loading, error, refetch }
 */
const useFetchDestinationsFromRecommendationResult = (sessionId) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = useCallback(async () => {
    if (!sessionId) {
      setDestinations([]);
      setLoading(false);
      setError("session_id tidak boleh kosong");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/recommendations/results/${sessionId}`, {
        headers: {
          Authorization: token,
        },
      });
      setDestinations(res.data.data || []);
      console.log(sessionId);
      console.log("Destinations fetched:", res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil destinasi dari hasil rekomendasi"
      );
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return { destinations, loading, error, refetch: fetchDestinations };
};

export default useFetchDestinationsFromRecommendationResult;