import axios from "axios";

const API_BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    apiKey: API_KEY || "",
    "Content-Type": "application/json",
  },
});

// Add error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
);
