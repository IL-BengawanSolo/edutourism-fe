import { useState, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk melakukan fetch ke chatbot API.
 * @returns { fetchChatbot, loading, error, data }
 */
const useChatbotFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchChatbot = useCallback(async (messages) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await axiosInstance.post("/chatbot/chat", { messages });
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan pada server.",
      );
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchChatbot, loading, error, data };
};

export default useChatbotFetch;
