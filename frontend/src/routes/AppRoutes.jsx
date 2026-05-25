import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LayoutProvider } from '@/context/LayoutContext';
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HotelsPage from '@/pages/hotels/HotelsPage';
import HotelDetailsPage from '@/pages/hotels/HotelDetailsPage';
import BookingPage from '@/pages/booking/BookingPage';
import BookingHistoryPage from '@/pages/booking/BookingHistoryPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import NotFoundPage from '@/pages/errors/NotFoundPage';
import UnauthorizedPage from '@/pages/errors/UnauthorizedPage';
import ProtectedRoute from '@/routes/ProtectedRoute';
import RoleProtectedRoute from '@/routes/RoleProtectedRoute';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <LayoutProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:id" element={<HotelDetailsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/booking-history" element={<BookingHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </LayoutProvider>
  );
}