import ApiConfig from "@/config/api.config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: ApiConfig.url,
  params: {
    domain:  ApiConfig.db != "" ? ApiConfig.db : undefined,
  },
  headers: {
    "Content-Type": ApiConfig.content_type,
    Accept: "application/json",
  },
});

// Optional: Interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can log or redirect here
    return Promise.reject(error);
  }
);

export default axiosInstance;
