import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

export default API;