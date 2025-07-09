import { useState, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk fetch data questions rekomendasi.
 * @returns { questions, loading, error, fetchQuestions }
 */
const useFetchQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/recommendations/questions");
      setQuestions(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil data pertanyaan"
      );
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { questions, loading, error, fetchQuestions };
};

export default useFetchQuestions;