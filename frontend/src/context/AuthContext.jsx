import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import authApi from '@/api/authApi';
import { saveAuth, logoutUser, getUser, getUserRole } from '@/utils/authUtils';
import { saveToken, getToken, getTokenExpiry } from '@/utils/tokenUtils';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [role, setRole] = useState(getUserRole());
  const [loading, setLoading] = useState(false);

  const scheduleAutoLogout = useCallback(() => {
    const expiry = getTokenExpiry();
    if (!expiry) return;
    const ms = expiry - Date.now();
    if (ms <= 0) {
      handleLogout();
      return;
    }
    // set timeout
    setTimeout(() => {
      handleLogout();
    }, ms + 500);
  }, []);

  useEffect(() => {
    scheduleAutoLogout();
  }, [scheduleAutoLogout]);

  async function handleLogin(credentials) {
    setLoading(true);
    try {
      const data = await authApi.login(credentials);
      const { token, user: userData } = data;
      if (!token) throw new Error('No token received');
      saveAuth(token, userData);
      setUser(userData || null);
      setRole((userData && userData.role) || null);
      scheduleAutoLogout();
      return data;
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logoutUser();
    setUser(null);
    setRole(null);
    window.location.href = '/login';
  }

  async function handleRegister(payload) {
    setLoading(true);
    try {
      const data = await authApi.register(payload);
      return data;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    role,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    isAuthenticated: !!getToken(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
