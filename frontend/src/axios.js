import axios from "axios";

const rawBase = import.meta.env.VITE_API_BASE_URL ?? "";

// normalize base: if provided without protocol, prefix with current protocol (safe-check for SSR)
let baseURL = rawBase.trim();
if (baseURL && !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(baseURL) && typeof window !== "undefined") {
  baseURL = `${window.location.protocol}//${baseURL.replace(/^\/+/, "")}`;
}

// fallback for local dev (backend default)
if (!baseURL && typeof window !== "undefined" && window.location.hostname === "localhost") {
  baseURL = "http://localhost:3000";
}

const instance = axios.create({
  baseURL, // if empty, requests are same-origin
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default instance;
