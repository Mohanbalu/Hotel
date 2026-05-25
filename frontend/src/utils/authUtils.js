import { saveToken, removeToken, parseJwt } from './tokenUtils';

const USER_KEY = 'hb_user';
const ROLE_KEY = 'hb_role';

export function saveUser(user) {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (user.role) localStorage.setItem(ROLE_KEY, user.role);
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function getUserRole() {
  return localStorage.getItem(ROLE_KEY) || null;
}

export function logoutUser() {
  removeToken();
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function saveAuth(token, user) {
  if (token) saveToken(token);
  if (user) saveUser(user);
}

export function decodeToken(token) {
  return parseJwt(token);
}
