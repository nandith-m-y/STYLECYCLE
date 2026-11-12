import axios from "axios";

/**
 * SECURITY NOTICE:
 * In Phase 1 prototyping, the API client connects to local development endpoints.
 * In Phase 2, authentication tokens will NOT be stored in localStorage.
 * Instead, the FastAPI backend will issue signed, HttpOnly, SameSite=Lax/Strict session
 * cookies, and this Axios instance will set withCredentials: true.
 */

const API_BASE_URL = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Prepared for HttpOnly cookie authentication in Phase 2
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    // Defense-in-depth: If legacy token exists, send it, but avoid relying on localStorage for production auth
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
    // Graceful fallback for mock mode when backend is offline
    if (error.code === "ERR_NETWORK" || !error.response) {
      console.info("[STYLECYCLE API] Operating in offline/mock mode for Phase 1.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
