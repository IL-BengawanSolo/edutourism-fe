import { useState, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

const useSearchAndFilterDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Melakukan pencarian dan filter destinasi.
   * @param {object} params - { search, region_id, category_id, place_type_id }
   */
  const searchAndFilter = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/destinations/search", {
        params,
      });
      setDestinations(res.data.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { destinations, loading, error, searchAndFilter };
};

export default useSearchAndFilterDestinations;
