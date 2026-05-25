/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)',
        glow: '0 18px 60px rgba(34, 211, 238, 0.2)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top left, rgba(59, 130, 246, 0.22), transparent 32%), radial-gradient(circle at top right, rgba(20, 184, 166, 0.18), transparent 25%), linear-gradient(135deg, rgba(15, 23, 42, 0.04), rgba(255, 255, 255, 0.92))',
      },
    },
  },
  plugins: [],
};