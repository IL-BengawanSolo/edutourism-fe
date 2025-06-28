import React from "react";
import { axiosInstance } from "../lib/axios";

const useFetchPlaceTypes = () => {
  const [placeTypes, setPlaceTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPlaceTypes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/place-types");
        setPlaceTypes(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceTypes();
  }, []);

  return { placeTypes, loading, error };
};

export default useFetchPlaceTypes;