import axios from "axios";
export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const axiosClient = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
