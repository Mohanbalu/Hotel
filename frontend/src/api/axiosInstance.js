import { handleApiError } from '@/utils/apiErrorHandler';
import { logoutUser } from '@/utils/authUtils';
import { getToken, removeToken } from '@/utils/tokenUtils';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9980/api';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error || {};
    if (!response) {
      // Network error
      handleApiError({ message: 'Network error. Please check your connection.' });
      return Promise.reject(error);
    }

    const isAuthRoute = response.config?.url?.includes('/auth/login') || response.config?.url?.includes('/auth/register');

    if ((response.status === 401 || response.status === 403) && !isAuthRoute) {
      // Token invalid or expired — ensure cleanup and redirect to login
      try {
        removeToken();
      } catch (e) {
        // ignore
      }
      logoutUser();
      window.location.href = '/login';
    }

    // For other errors, bubble up with a normalized shape
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
