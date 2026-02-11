import ApiConfig from "@/config/api.config";
import axios from "axios";

const axiosInstanceFormData = axios.create({
  baseURL: ApiConfig.url,
  params: {
    db: ApiConfig.db,
  },
  headers: {
    "Content-type": "multipart/form-data",
  },
});

// Optional: Interceptors
axiosInstanceFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can log or redirect here
    return Promise.reject(error);
  }
);

export default axiosInstanceFormData;
