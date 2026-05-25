import { motion } from 'framer-motion';

const statusClasses = {
  Confirmed: 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20',
  Pending: 'bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/20',
  Cancelled: 'bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/20',
};

export default function BookingCard({ booking }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-white">{booking.hotel}</p>
          <p className="text-sm text-slate-400">{booking.guest}</p>
          <p className="text-xs text-slate-500">{booking.date}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[booking.status] ?? 'bg-white/10 text-slate-300'}`}>
          {booking.status}
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
        <span>{booking.id}</span>
        <span className="font-semibold text-white">{booking.amount}</span>
      </div>
    </motion.article>
  );
}