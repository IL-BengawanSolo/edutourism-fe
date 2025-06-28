import React from "react";
import { axiosInstance } from "../lib/axios";

const useFetchSimilarDestinations = (slug) => {
  const [similar, setSimilar] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!slug) return;
    const fetchSimilar = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/destinations/${slug}/similar`);
        setSimilar(response.data.data || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSimilar();
  }, [slug]);

  return { similar, loading, error };
};

export default useFetchSimilarDestinations;