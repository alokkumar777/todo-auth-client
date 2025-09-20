import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

// Add JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
