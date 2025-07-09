import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const useCheckRecommendationSession = () => {
  const [hasSession, setHasSession] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setHasSession(false);
      setLoading(false);
      return;
    }
    try {
      const res = await axiosInstance.get("/recommendations/has-session", {
        headers: { Authorization: token },
      });
      setHasSession(!!res.data.hasSession);
    } catch {
      setHasSession(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return { hasSession, loading, refetch: fetchSession };
};

export default useCheckRecommendationSession;