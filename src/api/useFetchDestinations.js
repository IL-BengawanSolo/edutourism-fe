import React from "react";
import { axiosInstance } from "../lib/axios";

const useFetchDestinations = () => {
  const [destinations, setDestinations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axiosInstance.get("/destinations");
        setDestinations(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error };
};

export default useFetchDestinations;
