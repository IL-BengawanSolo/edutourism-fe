import axios from "axios";

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn("[axios] VITE_API_BASE_URL is not set — API requests will fail");
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
