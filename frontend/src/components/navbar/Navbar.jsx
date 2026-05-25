import { FiBell, FiMenu, FiUser, FiX } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Navbar({ onMenuToggle, mobileMenuOpen = false, links = [], showAvatar = true }) {
  const auth = useAuth();
  const { user, logout, isAuthenticated } = auth || {};

  const displayName = user?.email ? user.email.split('@')[0] : 'Guest';
  const displayRole = user?.role || 'GUEST';

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/65 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-cyan-300 text-slate-950 shadow-lg shadow-amber-500/20">
            <span className="text-sm font-black">HB</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Hotel Booking</p>
            <p className="text-xs text-slate-400">Luxury operations dashboard</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `nav-pill ${isActive ? 'nav-pill-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:border-amber-300/30 hover:text-white sm:inline-flex"
          >
            <FiBell />
          </button>
          
          {showAvatar && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-2 sm:flex">
                    <FiUser className="text-xl text-amber-200" />
                    <div className="leading-tight text-left">
                      <p className="text-xs text-slate-400">{displayRole}</p>
                      <p className="text-sm font-medium text-slate-100 capitalize">{displayName}</p>
                    </div>
                  </div>
                  
                  {user?.role === 'ADMIN' && (
                    <Link
                      to="/admin/dashboard"
                      className="hidden rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-200 hover:bg-amber-300/25 sm:inline-block"
                    >
                      Admin Panel
                    </Link>
                  )}
                  
                  <button
                    onClick={logout}
                    className="hidden rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-400/20 hover:text-rose-200 sm:inline-block"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 hover:bg-cyan-400/20 sm:inline-block"
                >
                  Log In
                </Link>
              )}
            </>
          )}

          {onMenuToggle && (
            <button
              type="button"
              onClick={onMenuToggle}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:border-amber-300/30 hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}