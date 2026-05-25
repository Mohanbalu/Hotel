import toast from 'react-hot-toast';
import { removeToken } from './tokenUtils';
import { logoutUser } from './authUtils';

function extractMessage(payload) {
  if (!payload) return 'Unexpected error';
  if (typeof payload === 'string') return payload;
  if (payload.message) return payload.message;
  if (payload.error) return payload.error;
  if (payload.errors) {
    if (Array.isArray(payload.errors)) return payload.errors.map((e) => e.message || e).join(', ');
    return JSON.stringify(payload.errors);
  }
  return JSON.stringify(payload);
}

export function handleValidationError(response) {
  const payload = response?.data || response;
  const message = extractMessage(payload) || 'Validation failed';
  toast.error(message);
}

export function handleUnauthorized(response) {
  const message = (response?.data && extractMessage(response.data)) || 'Session expired. Please sign in again.';
  // clear auth
  try {
    removeToken();
  } catch (e) {}
  try {
    logoutUser();
  } catch (e) {}
  toast.error(message);
  // redirect handled by axios interceptor or auth context
}

export function handleServerError(response) {
  const message = (response?.data && extractMessage(response.data)) || 'Server error. Try again later.';
  toast.error(message);
}

export function handleApiError(error) {
  console.error('API Error:', error);
  const response = error?.response;
  if (!response) {
    toast.error('Network error. Please check your connection.');
    return;
  }

  switch (response.status) {
    case 400:
      handleValidationError(response);
      break;
    case 401:
      handleUnauthorized(response);
      break;
    case 403:
      toast.error('Access denied. You do not have permission to perform this action.');
      break;
    case 404:
      toast.error('Resource not found.');
      break;
    case 409:
      toast.error(extractMessage(response.data) || 'Conflict error.');
      break;
    case 500:
      handleServerError(response);
      break;
    default:
      toast.error(extractMessage(response.data) || response.statusText || 'Unexpected error');
  }
}

export default handleApiError;
