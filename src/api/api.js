
import axios from "axios";

const api = axios.create({
  baseURL: "https://crm-backend-three-rosy.vercel.app", 
  timeout: 20000, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
