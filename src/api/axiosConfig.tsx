import axios from "axios";

const axiosInstance = axios.create({
  // .. where we make our configurations
  baseURL: "http://localhost:8080/",
});

export default axiosInstance;
