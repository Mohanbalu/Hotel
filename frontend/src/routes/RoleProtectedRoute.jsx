import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserRole } from '@/utils/authUtils';

export default function RoleProtectedRoute({ allowedRoles = [], redirectTo = '/unauthorized' }) {
  const role = getUserRole();
  if (!role || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
