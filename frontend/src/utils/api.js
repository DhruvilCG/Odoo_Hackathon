// src/utils/api.js
import Cookies from "js-cookie";

export const apiFetch = async (url, options = {}) => {
  const token = Cookies.get("token");

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }
  return res.json();
};
