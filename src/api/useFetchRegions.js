import React from "react";
import { axiosInstance } from "../lib/axios";

const useFetchRegions = () => {
  const [regions, setRegions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/destinations/regions");
        setRegions(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return { regions, loading, error };
};

export default useFetchRegions;