import axios from 'axios';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL?.trim() ||
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  '/api'
).replace(/\/+$/, '') || '/api';

const useCredentials = import.meta.env.VITE_API_WITH_CREDENTIALS === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: useCredentials,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // Prevent duplicate "/api" when baseURL already ends with "/api"
  // and callers still pass "/api/..." style endpoints.
  if (
    typeof config.url === 'string' &&
    typeof config.baseURL === 'string' &&
    config.url.startsWith('/api/') &&
    config.baseURL.replace(/\/+$/, '').endsWith('/api')
  ) {
    config.url = config.url.replace(/^\/api/, '');
  }

  return config;
});



export default api;
