import axios from "axios";

/**
 * STYLECYCLE API Client
 * Connects to FastAPI Backend Engine at /api/v1 (proxied via Vite or direct to http://127.0.0.1:8000).
 */
const API_BASE_URL = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) || "/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("stylecycle_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK" || !error.response) {
      console.info("[STYLECYCLE API] Operating in fallback mode for Phase 1.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
