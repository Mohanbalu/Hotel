import Footer from '@/components/common/Footer';
import Navbar from '@/components/navbar/Navbar';
import { authLinks } from '@/utils/navigation';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="app-shell min-h-screen text-slate-100">
      <Navbar links={authLinks} showAvatar={false} />

      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden overflow-hidden border-r border-white/10 px-8 py-12 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.12),_transparent_30%)]" />
          <div className="space-y-6">
            <span className="section-chip relative z-10 w-fit">
              Secure access
            </span>
            <div className="relative z-10 space-y-4">
              <h1 className="max-w-lg text-5xl font-semibold tracking-tight text-white">
                Premium hotel booking experiences for modern teams.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300">
                This skeleton focuses on onboarding, discovery, reservations, and admin workflows with a polished SaaS visual system.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-2">
            <div className="soft-card p-5">
              <p className="text-sm text-slate-400">Fast setup</p>
              <p className="mt-2 text-lg font-semibold text-white">Hackathon ready</p>
            </div>
            <div className="soft-card p-5">
              <p className="text-sm text-slate-400">Enterprise UI</p>
              <p className="mt-2 text-lg font-semibold text-white">Scalable design system</p>
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-xl">
            <Outlet />
          </div>
        </section>
      </main>

      <Footer compact />
    </div>
  );
}