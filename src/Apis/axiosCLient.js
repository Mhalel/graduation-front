import axios from "axios";

export const SERVER_BASE_URL = "http://localhost:7000/api/v1";

const axiosClient = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
