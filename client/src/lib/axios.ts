import axios from 'axios';

// The Vite server will proxy /api to the backend in dev, or we can use full URL.
// We'll set VITE_API_URL in .env
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for responses (e.g. to handle global errors like 401s later)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can add global error handling here if we want
    return Promise.reject(error);
  }
);
