import { bookings } from '@/utils/mockData';

const statusClasses = {
  Confirmed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  CONFIRMED: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  PENDING: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  CREATED: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  Cancelled: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  CANCELLED: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

export default function BookingTable({ rows = bookings }) {
  const getBookingId = (row) => row.id?.toString().startsWith('BK-') ? row.id : `BK-${1000 + row.id}`;
  const getHotelName = (row) => row.hotel || row.room?.hotel?.name || 'Azure Skyline Resort';
  const getGuestName = (row) => row.guest || row.user?.username?.split('@')[0] || 'Guest User';
  const getBookingDate = (row) => row.date || (row.checkIn && row.checkOut ? `${row.checkIn} to ${row.checkOut}` : 'Aug 12 - 16, 2026');
  const getBookingStatus = (row) => row.status || 'Confirmed';
  const getBookingAmount = (row) => row.amount || (row.totalAmount ? `₹${row.totalAmount}` : '₹1,148');

  return (
    <div className="glass-table border border-white/5 bg-slate-950/20 overflow-x-auto">
      <table className="min-w-full divide-y divide-white/5 text-left text-sm">
        <thead className="bg-white/5 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
          <tr>
            <th className="px-6 py-4">Booking ID</th>
            <th className="px-6 py-4">Hotel</th>
            <th className="px-6 py-4">Guest</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-slate-300">
          {rows.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                No bookings found.
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const status = getBookingStatus(row);
              return (
                <tr key={row.id} className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 font-mono font-semibold text-cyan-400 text-xs">{getBookingId(row)}</td>
                  <td className="px-6 py-4 font-medium text-white">{getHotelName(row)}</td>
                  <td className="px-6 py-4 text-slate-300 capitalize">{getGuestName(row)}</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{getBookingDate(row)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${statusClasses[status] ?? 'bg-white/10 text-slate-300'}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white text-right">{getBookingAmount(row)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}