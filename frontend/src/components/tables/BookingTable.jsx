import { bookings } from '@/utils/mockData';

const statusClasses = {
  Confirmed: 'bg-emerald-400/15 text-emerald-300',
  Pending: 'bg-amber-400/15 text-amber-300',
  Cancelled: 'bg-rose-400/15 text-rose-300',
};

export default function BookingTable({ rows = bookings }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead className="bg-white/5 text-slate-300">
          <tr>
            <th className="px-6 py-4 font-medium">Booking ID</th>
            <th className="px-6 py-4 font-medium">Hotel</th>
            <th className="px-6 py-4 font-medium">Guest</th>
            <th className="px-6 py-4 font-medium">Date</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-slate-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-white/5">
              <td className="px-6 py-4 font-medium text-white">{row.id}</td>
              <td className="px-6 py-4">{row.hotel}</td>
              <td className="px-6 py-4">{row.guest}</td>
              <td className="px-6 py-4">{row.date}</td>
              <td className="px-6 py-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[row.status] ?? 'bg-white/10 text-slate-300'}`}>
                  {row.status}
                </span>
              </td>
              <td className="px-6 py-4 font-semibold text-white">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}