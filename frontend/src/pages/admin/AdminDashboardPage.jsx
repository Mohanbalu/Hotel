import { FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import StatsCard from '@/components/cards/StatsCard';
import BookingTable from '@/components/tables/BookingTable';
import { quickStats } from '@/utils/navigation';
import { useEffect, useState } from 'react';
import userApi from '@/api/userApi';
import bookingApi from '@/api/bookingApi';

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [u, b] = await Promise.all([userApi.getAllUsers(), bookingApi.getAllBookings()]);
        setUsers(Array.isArray(u) ? u : []);
        setBookings(Array.isArray(b) ? b : []);
      } catch (err) {
        // handled globally
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <PageWrapper
      title="Admin Dashboard"
      description="Executive dashboard skeleton with statistics, analytics placeholders, revenue cards, and recent booking insights."
    >
      <section className="grid gap-5 md:grid-cols-3">
        {quickStats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Booking Analytics</h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Weekly Trend</span>
          </div>
          <div id="analytics" className="grid gap-4 lg:grid-cols-2">
            <div className="min-h-64 rounded-3xl border border-dashed border-white/15 bg-slate-950/40 p-5">
              <p className="text-sm text-slate-400">Revenue chart placeholder</p>
              <div className="mt-4 flex h-40 items-end gap-3">
                {[45, 72, 56, 90, 68, 82].map((height, index) => (
                  <div key={index} className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-500/80 to-blue-500/40" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="min-h-64 rounded-3xl border border-dashed border-white/15 bg-slate-950/40 p-5">
              <p className="text-sm text-slate-400">Occupancy chart placeholder</p>
              <div className="mt-4 grid h-40 grid-cols-7 items-end gap-2">
                {[32, 58, 41, 77, 63, 88, 74].map((height, index) => (
                  <div key={index} className="rounded-t-2xl bg-gradient-to-t from-emerald-400/80 to-cyan-400/40" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Revenue Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {[
              { label: 'Monthly Revenue', value: '$84,200', icon: FiDollarSign },
              { label: 'New Guests', value: users.length.toString(), icon: FiUsers },
              { label: 'Growth Rate', value: '18.7%', icon: FiTrendingUp },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                  <item.icon className="text-2xl text-cyan-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-white">Recent Bookings</h2>
        <BookingTable rows={bookings} />
      </section>
    </PageWrapper>
  );
}