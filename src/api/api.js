// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API base URL
  timeout: 10000, // Optional timeout
  headers: {
    "Content-Type": "application/json",
    // Add any other common headers
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
