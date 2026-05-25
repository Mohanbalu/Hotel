import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/utils/tokenUtils';

export default function ProtectedRoute({ redirectTo = '/login' }) {
  const auth = isAuthenticated();
  if (!auth) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
