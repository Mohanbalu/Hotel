import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/common/Footer';
import { authLinks } from '@/utils/navigation';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar links={authLinks} showAvatar={false} />

      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
        <aside className="hidden border-r border-white/10 bg-hero-grid px-8 py-12 lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
              Secure access
            </span>
            <div className="space-y-4">
              <h1 className="max-w-lg text-5xl font-semibold tracking-tight text-white">
                Premium hotel booking experiences for modern teams.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300">
                This skeleton focuses on onboarding, discovery, reservations, and admin workflows with a polished SaaS visual system.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm text-slate-400">Fast setup</p>
              <p className="mt-2 text-lg font-semibold text-white">Hackathon ready</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
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