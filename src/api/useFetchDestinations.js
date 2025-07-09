import React from "react";
import { axiosInstance } from "../lib/axios";

const useFetchDestinations = (params = {}) => {
  const [destinations, setDestinations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/destinations/search", {
          params,
        });
        setDestinations(response.data.data || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  // Gunakan JSON.stringify agar hanya fetch jika isi params berubah
  }, [JSON.stringify(params)]);

  return { destinations, loading, error };
};

export default useFetchDestinations;