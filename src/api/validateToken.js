import { axiosInstance } from "../lib/axios";

/**
 * Fungsi untuk validasi token JWT ke backend.
 * @returns {Promise<user>}
 */
export const validateToken = async (token) => {
  const res = await axiosInstance.get("/auth/me", {
    headers: { Authorization: token },
  });
  return res.data.data;
};