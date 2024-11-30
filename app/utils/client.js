import axios from "axios";

export const API_BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
export const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    apiKey: API_KEY,
  },
});

export default axiosInstance;
