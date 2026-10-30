import axios from "axios";

export const _axios = axios.create({
  baseURL: import.meta.env.VITE_API || "https://store-api.softclub.tj",
});

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

_axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
