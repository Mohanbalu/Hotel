import axios from 'axios';
import { getToken, removeToken } from '@/utils/tokenUtils';
import { logoutUser } from '@/utils/authUtils';
import { handleApiError } from '@/utils/apiErrorHandler';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
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

    if (response.status === 401 || response.status === 403) {
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
    handleApiError(response.data || { message: response.statusText });
    return Promise.reject(error);
  }
);

export default axiosInstance;
