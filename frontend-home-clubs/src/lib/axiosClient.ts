import axios from "axios";

/**
 * Central Axios instance for all Clubs API calls.
 *
 * Point this at the real backend by setting VITE_API_BASE_URL in a .env
 * file, e.g. VITE_API_BASE_URL=https://api.campusclubs.edu/v1
 *
 * When no backend is configured, ./mockAdapter.ts intercepts requests on
 * this instance and serves the local mock dataset so the app runs
 * standalone. Remove the mockAdapter import in main.tsx once a real
 * API is available.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
