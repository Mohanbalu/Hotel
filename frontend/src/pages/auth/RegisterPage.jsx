import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import InputField from '@/components/forms/InputField';
import useToggle from '@/hooks/useToggle';
import PageWrapper from '@/components/common/PageWrapper';

export default function RegisterPage() {
  const [showPassword, togglePassword] = useToggle(false);

  return (
    <PageWrapper
      title="Create your account"
      description="Launch the hotel booking experience with a modern onboarding flow and responsive form layout."
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-8">
        <form className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="First Name" placeholder="Ava" icon={<FiUser />} />
            <InputField label="Last Name" placeholder="Johnson" icon={<FiUser />} />
          </div>
          <InputField label="Email Address" type="email" placeholder="ava@company.com" icon={<FiMail />} />
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Password</span>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 focus-within:border-cyan-400/50 focus-within:ring-2 focus-within:ring-cyan-400/20">
              <FiLock className="text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a secure password"
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              />
              <button type="button" onClick={togglePassword} className="text-slate-400 transition hover:text-cyan-300" aria-label="Toggle password visibility">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
            <input type="checkbox" className="mt-1 rounded border-white/10 bg-transparent text-cyan-400 focus:ring-cyan-400/30" />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>

          <button type="submit" className="w-full rounded-2xl bg-cyan-400 px-4 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-cyan-300 transition hover:text-cyan-200">
            Sign in
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}