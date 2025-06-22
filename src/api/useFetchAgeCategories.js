import React from "react";
import { axiosInstance } from "../lib/axios";

const useFetchAgeCategories = () => {
  const [ageCategories, setAgeCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchAgeCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/age-categories");
        setAgeCategories(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgeCategories();
  }, []);

  return { ageCategories, loading, error };
};

export default useFetchAgeCategories;