// axiosClient.js
import axios from "axios";

export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const axiosClient = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// هنا بنضيف interceptor علشان نضيف اللغة قبل كل طلب
axiosClient.interceptors.request.use((config) => {
  const lang = localStorage.getItem("lang") || "en";
  config.headers.lang = lang;
  return config;
});

export default axiosClient;
