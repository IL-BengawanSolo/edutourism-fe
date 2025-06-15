import React from "react";
import { axiosInstance } from "../lib/axios";

const useFetchDestinationBySlug = (slug) => {
  const [destination, setDestination] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!slug) return;
    const fetchDestination = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/destinations/${slug}`);
        setDestination(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  return { destination, loading, error };
};

export default useFetchDestinationBySlug;