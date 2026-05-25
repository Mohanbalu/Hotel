import { FiBell, FiMenu, FiUserCircle, FiX } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ onMenuToggle, mobileMenuOpen = false, links = [], showAvatar = true }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-glow">
            <span className="text-sm font-black">HB</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-50">Hotel Booking</p>
            <p className="text-xs text-slate-400">Enterprise Frontend</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300 sm:inline-flex"
          >
            <FiBell />
          </button>
          {showAvatar && (
            <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 sm:flex">
              <FiUserCircle className="text-xl text-cyan-300" />
              <div className="leading-tight">
                <p className="text-xs text-slate-400">Welcome back</p>
                <p className="text-sm font-medium text-slate-100">Admin User</p>
              </div>
            </div>
          )}
          {onMenuToggle && (
            <button
              type="button"
              onClick={onMenuToggle}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300 lg:hidden"
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