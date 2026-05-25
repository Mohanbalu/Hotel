import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '@/components/forms/InputField';
import useToggle from '@/hooks/useToggle';
import PageWrapper from '@/components/common/PageWrapper';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [showPassword, togglePassword] = useToggle(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resp = await auth.login({ email, password });
      const role = resp?.user?.role || resp?.role;
      if (role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err) {
      // auth context + axios will handle errors
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper
      title="Welcome back"
      description="Sign in to manage bookings, discover resorts, and view operations."
    >
      <div className="rounded-[2.5rem] border border-white/5 bg-slate-950/40 p-8 shadow-2xl backdrop-blur-3xl sm:p-10">
        <form className="space-y-6" onSubmit={onSubmit}>
          <InputField 
            label="Email Address" 
            type="email" 
            placeholder="admin@hotelbooking.com" 
            icon={<FiMail className="text-amber-300" />} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-3.5 focus-within:border-amber-400/40 focus-within:ring-2 focus-within:ring-amber-400/10 transition-all duration-200">
              <FiLock className="text-amber-300" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full bg-transparent text-slate-200 outline-none text-sm placeholder:text-slate-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={togglePassword} className="text-slate-500 transition hover:text-amber-300" aria-label="Toggle password visibility">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="rounded border-white/5 bg-transparent text-amber-500 focus:ring-amber-500/20" />
              Remember me
            </label>
            <a href="#" className="font-semibold text-amber-400 transition hover:text-amber-300">
              Forgot password?
            </a>
          </div>

          <button disabled={submitting} type="submit" className="primary-action w-full py-3.5 font-bold shadow-lg shadow-amber-500/10">
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          New here?{' '}
          <Link to="/register" className="font-bold text-amber-400 transition hover:text-amber-300">
            Create an account
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}