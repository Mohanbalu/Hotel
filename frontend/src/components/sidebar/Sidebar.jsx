import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { FiLogOut, FiShield } from 'react-icons/fi';

export default function Sidebar({ title, items, open = true, collapsed = false, onToggle, onClose }) {
  const auth = useAuth();
  const { user, logout, isAuthenticated } = auth || {};

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-2xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${collapsed ? 'lg:w-20' : 'lg:w-72'}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">{title}</p>
            <p className="mt-1 text-xs text-slate-400">Navigation</p>
          </div>
          {onToggle && (
            <button
              type="button"
              className="hidden rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-slate-200 transition hover:border-amber-300/30 hover:text-white lg:inline-flex"
              onClick={onToggle}
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
          )}
          <button
            type="button"
            className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-slate-200 lg:hidden"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {user?.role === 'ADMIN' && (
            <NavLink
              to="/admin/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? 'bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/15'
                    : 'text-amber-300 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10'
                } ${collapsed ? 'lg:justify-center lg:px-3' : ''}`
              }
            >
              <FiShield className="text-lg" />
              <span className={`${collapsed ? 'lg:hidden' : ''}`}>Admin Panel</span>
            </NavLink>
          )}
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition duration-200 ${
                    isActive
                      ? 'bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/15'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  } ${collapsed ? 'lg:justify-center lg:px-3' : ''}`
                }
              >
                <Icon className="text-lg" />
                <span className={`${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {!isAuthenticated ? (
          <div className="px-4 py-2">
            <NavLink
              to="/login"
              onClick={onClose}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-cyan-300 transition duration-200 hover:bg-cyan-500/10 hover:text-cyan-200 ${
                collapsed ? 'lg:justify-center lg:px-3' : ''
              }`}
            >
              <FiLogOut className="text-lg rotate-180" />
              <span className={`${collapsed ? 'lg:hidden' : ''}`}>Log In</span>
            </NavLink>
          </div>
        ) : (
          <div className="px-4 py-2">
            <button
              onClick={logout}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-rose-300 transition duration-200 hover:bg-rose-500/10 hover:text-rose-200 ${
                collapsed ? 'lg:justify-center lg:px-3' : ''
              }`}
            >
              <FiLogOut className="text-lg" />
              <span className={`${collapsed ? 'lg:hidden' : ''}`}>Log Out</span>
            </button>
          </div>
        )}

        <div className="border-t border-white/10 p-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-amber-300/15 via-white/8 to-cyan-300/10 p-4 text-sm text-slate-200">
            <p className="font-semibold text-white">Scale-ready layout</p>
            <p className="mt-2 text-slate-300">Navigation optimized for hotel operations, analytics, and bookings.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}