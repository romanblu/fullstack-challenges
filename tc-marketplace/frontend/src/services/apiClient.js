import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true, // ⭐ required for cart session cookie
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiClient;