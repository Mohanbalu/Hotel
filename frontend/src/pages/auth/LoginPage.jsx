import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import InputField from '@/components/forms/InputField';
import useToggle from '@/hooks/useToggle';
import PageWrapper from '@/components/common/PageWrapper';

export default function LoginPage() {
  const [showPassword, togglePassword] = useToggle(false);

  return (
    <PageWrapper
      title="Welcome back"
      description="Sign in to manage bookings, hotels, and operational dashboards in a polished enterprise UI."
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-8">
        <form className="space-y-5">
          <InputField label="Email Address" type="email" placeholder="admin@hotelbooking.com" icon={<FiMail />} />
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Password</span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 focus-within:border-cyan-400/50 focus-within:ring-2 focus-within:ring-cyan-400/20">
              <FiLock className="text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              />
              <button type="button" onClick={togglePassword} className="text-slate-400 transition hover:text-cyan-300" aria-label="Toggle password visibility">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-white/10 bg-transparent text-cyan-400 focus:ring-cyan-400/30" />
              Remember me
            </label>
            <a href="#" className="text-cyan-300 transition hover:text-cyan-200">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="w-full rounded-2xl bg-cyan-400 px-4 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New here?{' '}
          <Link to="/register" className="font-medium text-cyan-300 transition hover:text-cyan-200">
            Create an account
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}