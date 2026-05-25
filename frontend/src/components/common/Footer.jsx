import { footerLinks } from '@/utils/navigation';
import { Link } from 'react-router-dom';

export default function Footer({ compact = false }) {
  return (
    <footer className={`border-t border-white/10 bg-slate-950/45 ${compact ? 'py-6' : 'py-10'}`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1.1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-white">Hotel Booking</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
              A polished booking experience built for discovery, reservations, and admin operations.
            </p>
          </div>
          <p className="text-xs text-slate-500">Designed for demos, team workflows, and future production rollout.</p>
        </div>

        <div className="soft-card p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Quick Access</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">Explore hotels, book stays, and manage dashboards from a single modern interface.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link key={link.label} to={link.to} className="block text-sm text-slate-300 transition hover:text-amber-200">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}