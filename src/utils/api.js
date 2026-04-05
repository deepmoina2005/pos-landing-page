import axios from 'axios';

const defaultBaseUrl = import.meta.env.DEV
  ? 'http://localhost:5000'
  : (typeof window !== 'undefined' ? window.location.origin : '');

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  defaultBaseUrl
).replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




export default api;
