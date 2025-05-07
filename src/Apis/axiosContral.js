import axios from "axios";
export const SERVER_Contral_URL = import.meta.env.VITE_SERVER_Contral_URL;

const axiosContral = axios.create({
  baseURL: SERVER_Contral_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosContral;
