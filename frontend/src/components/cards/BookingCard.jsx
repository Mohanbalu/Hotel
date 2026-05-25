import { motion } from 'framer-motion';

const statusClasses = {
  Confirmed: 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20',
  Pending: 'bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/20',
  Cancelled: 'bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/20',
};

export default function BookingCard({ booking }) {
  const hotelName = booking.hotel || booking.room?.hotel?.name || 'Azure Skyline Resort';
  const guestName = booking.guest || booking.user?.username?.split('@')[0] || 'Guest User';
  const dateStr = booking.date || (booking.checkIn && booking.checkOut ? `${booking.checkIn} to ${booking.checkOut}` : 'Aug 12 - 16, 2026');
  const amountStr = booking.amount || (booking.totalAmount ? `₹${booking.totalAmount}` : '₹1,148');
  const statusStr = booking.status || booking.bookingStatus || 'Confirmed';
  const bookingId = booking.id?.toString().startsWith('BK-') ? booking.id : `BK-${1000 + booking.id}`;

  const statusClassKey = statusStr.toUpperCase() === 'CONFIRMED' ? 'Confirmed' : (statusStr.toUpperCase() === 'CANCELLED' ? 'Cancelled' : 'Pending');

  return (
    <motion.article whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-white">{hotelName}</p>
          <p className="text-sm text-slate-400">{guestName}</p>
          <p className="text-xs text-slate-500">{dateStr}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[statusClassKey] ?? 'bg-white/10 text-slate-300'}`}>
          {statusStr}
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
        <span>{bookingId}</span>
        <span className="font-semibold text-white">{amountStr}</span>
      </div>
    </motion.article>
  );
}