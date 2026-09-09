import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://edusolo-general-api.vercel.app/api/v1";

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn("[axios] VITE_API_BASE_URL is not set — fallback to", baseURL);
}

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});
