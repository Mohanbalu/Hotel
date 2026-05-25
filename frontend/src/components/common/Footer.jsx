import { Link } from 'react-router-dom';
import { footerLinks } from '@/utils/navigation';

export default function Footer({ compact = false }) {
  return (
    <footer className={`border-t border-white/10 bg-slate-950/70 ${compact ? 'py-6' : 'py-10'}`}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.3fr_2fr] lg:px-8">
        <div className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-slate-50">Hotel Booking</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Enterprise-grade hotel booking interface for seamless discovery, reservations, and operations.
            </p>
          </div>
          <p className="text-xs text-slate-500">Built for scalable team collaboration and product demos.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link key={link.label} to={link.to} className="block text-sm text-slate-300 transition hover:text-cyan-300">
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