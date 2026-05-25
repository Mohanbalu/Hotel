import { FiBell, FiBookOpen, FiGrid, FiHome, FiHotel, FiLayout, FiLogIn, FiShield, FiUser } from 'react-icons/fi';

export const mainNavigation = [
  { label: 'Home', to: '/', icon: FiHome },
  { label: 'Hotels', to: '/hotels', icon: FiHotel },
  { label: 'Bookings', to: '/booking-history', icon: FiBookOpen },
  { label: 'Profile', to: '/profile', icon: FiUser },
];

export const adminNavigation = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: FiLayout },
  { label: 'Bookings', to: '/booking-history', icon: FiBookOpen },
  { label: 'Hotels', to: '/hotels', icon: FiHotel },
  { label: 'Security', to: '/unauthorized', icon: FiShield },
];

export const authLinks = [
  { label: 'Explore Hotels', to: '/hotels', icon: FiGrid },
  { label: 'Admin Preview', to: '/admin/dashboard', icon: FiShield },
  { label: 'Login', to: '/login', icon: FiLogIn },
];

export const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Hotels', to: '/hotels' },
      { label: 'Bookings', to: '/booking-history' },
      { label: 'Dashboard', to: '/admin/dashboard' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', to: '/login' },
      { label: 'Register', to: '/register' },
      { label: 'Profile', to: '/profile' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/404' },
      { label: 'Security', to: '/unauthorized' },
      { label: 'Status', to: '/404' },
    ],
  },
];

export const quickStats = [
  { label: 'Total Bookings', value: '2,348', delta: '+12.4%', icon: FiBell },
  { label: 'Active Hotels', value: '182', delta: '+5.1%', icon: FiHotel },
  { label: 'Revenue', value: '$348K', delta: '+18.7%', icon: FiBell },
];