import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '@/components/forms/InputField';
import useToggle from '@/hooks/useToggle';
import PageWrapper from '@/components/common/PageWrapper';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [showPassword, togglePassword] = useToggle(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await auth.register({ firstName, lastName, email, password });
      alert('Registration successful — please sign in');
      navigate('/login');
    } catch (err) {
      // error displayed by api error handler
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper
      title="Create account"
      description="Join us to discover verified boutique resorts and book stays."
    >
      <div className="rounded-[2.5rem] border border-white/5 bg-slate-950/40 p-8 shadow-2xl backdrop-blur-3xl sm:p-10">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField 
              label="First Name" 
              placeholder="Ava" 
              icon={<FiUser className="text-amber-300" />} 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
            <InputField 
              label="Last Name" 
              placeholder="Johnson" 
              icon={<FiUser className="text-amber-300" />} 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
          </div>
          
          <InputField 
            label="Email Address" 
            type="email" 
            placeholder="ava@company.com" 
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
                placeholder="Create a secure password"
                className="w-full bg-transparent text-slate-200 outline-none text-sm placeholder:text-slate-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={togglePassword} className="text-slate-500 transition hover:text-amber-300" aria-label="Toggle password visibility">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-950/40 p-4 text-xs text-slate-400 cursor-pointer select-none">
            <input type="checkbox" className="mt-0.5 rounded border-white/5 bg-transparent text-amber-500 focus:ring-amber-500/20" />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>

          <button disabled={submitting} type="submit" className="primary-action w-full py-3.5 font-bold shadow-lg shadow-amber-500/10">
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-amber-400 transition hover:text-amber-300">
            Sign in
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}