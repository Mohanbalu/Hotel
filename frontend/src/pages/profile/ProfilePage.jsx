import { FiCreditCard, FiSettings, FiUser } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import InputField from '@/components/forms/InputField';

export default function ProfilePage() {
  return (
    <PageWrapper
      title="Profile"
      description="User profile, booking summary, and account settings built as a polished dashboard shell."
    >
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-cyan-400/15 text-2xl text-cyan-300">
              <FiUser />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Ava Johnson</h2>
              <p className="text-sm text-slate-400">Premium guest profile</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Bookings', '14'],
              ['Rewards', '2,450'],
              ['Saved', '8'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm text-slate-400">Recent Booking</p>
            <p className="mt-2 text-xl font-semibold text-white">Azure Skyline Resort</p>
            <p className="mt-1 text-sm text-slate-400">Aug 12 - Aug 16, 2026</p>
          </div>
        </div>

        <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-lg font-semibold text-white">
            <FiSettings className="text-cyan-300" /> Account Settings
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="First Name" defaultValue="Ava" />
            <InputField label="Last Name" defaultValue="Johnson" />
            <InputField label="Email" defaultValue="ava@company.com" type="email" />
            <InputField label="Phone" defaultValue="+1 555 000 000" />
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Bio</span>
            <textarea className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500" rows="4" defaultValue="Frequent traveler and premium guest." />
          </label>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
            <FiCreditCard /> Save Changes
          </button>
        </div>
      </section>
    </PageWrapper>
  );
}