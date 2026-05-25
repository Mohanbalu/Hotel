import { NavLink } from 'react-router-dom';

export default function Sidebar({ title, items, open = true, collapsed = false, onToggle, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${collapsed ? 'lg:w-20' : 'lg:w-72'}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{title}</p>
            <p className="mt-1 text-xs text-slate-500">Navigation</p>
          </div>
          <button
            type="button"
            className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:text-white lg:inline-flex"
            onClick={onToggle}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
          <button
            type="button"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 lg:hidden"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  } ${collapsed ? 'lg:justify-center lg:px-3' : ''}`
                }
              >
                <Icon className="text-lg" />
                <span className={`${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-4 text-sm text-slate-200">
            <p className="font-semibold text-white">Scale-ready layout</p>
            <p className="mt-2 text-slate-300">Dashboard navigation optimized for hotel operations, analytics, and bookings.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}