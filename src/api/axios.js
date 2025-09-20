import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-auth-backend-3.onrender.com/",
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
