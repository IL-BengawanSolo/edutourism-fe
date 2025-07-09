import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

/**
 * Hook untuk fetch gambar destinasi dari backend.
 * @param {string} uuid - UUID destinasi
 * @returns { images, loading, error, refetch }
 */
const useFetchDestinationImages = (uuid) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    if (!uuid) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/destinations/${uuid}/images`);
      setImages(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil gambar destinasi"
      );
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [uuid]);

  return { images, loading, error, refetch: fetchImages };
};

export default useFetchDestinationImages;