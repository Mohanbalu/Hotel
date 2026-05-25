import { FiCreditCard, FiSettings, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import InputField from '@/components/forms/InputField';
import TextAreaField from '@/components/forms/TextAreaField';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import userApi from '@/api/userApi';
import bookingApi from '@/api/bookingApi';

export default function ProfilePage() {
  const auth = useAuth();
  const [profile, setProfile] = useState(auth.user || {});
  const [userBookings, setUserBookings] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setProfile(auth.user || {});
  }, [auth.user]);

  useEffect(() => {
    async function loadBookings() {
      if (profile.id) {
        try {
          const bookingsData = await bookingApi.getUserBookings(profile.id);
          setUserBookings(Array.isArray(bookingsData) ? bookingsData : []);
        } catch (err) {
          console.error('Failed to load user bookings', err);
        }
      }
    }
    loadBookings();
  }, [profile.id]);

  async function onSave() {
    setSaving(true);
    try {
      await userApi.updateUser(profile.id, profile);
      if (auth.updateUser) {
        auth.updateUser(profile);
      }
      alert('Profile updated successfully');
    } catch (err) {
      // handled globally
    } finally {
      setSaving(false);
    }
  }

  const displayName = profile.firstName || profile.lastName 
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
    : profile.username || 'Guest';

  const sortedBookings = [...userBookings].sort((a, b) => b.id - a.id);
  const recentBooking = sortedBookings[0];
  const recentHotelName = recentBooking?.room?.hotel?.name || recentBooking?.hotel || 'No bookings yet';
  const recentBookingDates = recentBooking 
    ? `${recentBooking.checkInDate || recentBooking.checkIn || ''} to ${recentBooking.checkOutDate || recentBooking.checkOut || ''}`
    : 'Book a sanctuary to get started';

  return (
    <PageWrapper
      title="My Profile"
      description="Manage your account profile, check your reward points, and configure security preferences."
    >
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 soft-card p-6 md:p-8 border border-white/5 hover:border-amber-500/10 duration-300">
          <div className="flex items-center gap-5">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-tr from-amber-500/20 to-amber-300/10 border border-amber-500/30 text-2xl text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <FiUser />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{displayName}</h2>
              <span className="inline-block mt-1 rounded-full bg-amber-400/10 px-3 py-0.5 text-xs font-semibold text-amber-300 border border-amber-400/20">
                {profile.role || 'Guest'}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Bookings', userBookings.length.toString()],
              ['Rewards', `${userBookings.length * 150} pts`],
              ['Saved', profile.savedCount || '0'],
            ].map(([label, value]) => (
              <motion.div
                whileHover={{ y: -2 }}
                key={label}
                className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 hover:border-amber-400/20 transition-all duration-300"
              >
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{value}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 border-l-4 border-l-amber-500 shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">Recent Booking</p>
            <p className="mt-2 text-lg font-semibold text-white">{recentHotelName}</p>
            <p className="mt-1 text-xs text-slate-400">{recentBookingDates}</p>
          </div>
        </div>

        <div className="space-y-6 soft-card p-6 md:p-8 border border-white/5 hover:border-amber-500/10 duration-300">
          <div className="flex items-center gap-2.5 text-lg font-semibold text-white border-b border-white/5 pb-4">
            <FiSettings className="text-amber-400" /> Account Settings
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="First Name"
              placeholder="First Name"
              value={profile.firstName || ''}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
            <InputField
              label="Last Name"
              placeholder="Last Name"
              value={profile.lastName || ''}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
            <InputField
              label="Email Address"
              placeholder="Email"
              icon={<FiMail />}
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              type="email"
            />
            <InputField
              label="Phone Number"
              placeholder="Phone"
              icon={<FiPhone />}
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          
          <TextAreaField
            label="Bio"
            placeholder="Tell us about yourself..."
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />

          <div className="flex justify-end pt-2">
            <button
              disabled={saving}
              onClick={onSave}
              className="primary-action w-full sm:w-auto"
            >
              <FiCreditCard /> {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}