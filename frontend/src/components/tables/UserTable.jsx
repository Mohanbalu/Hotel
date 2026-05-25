import { userRows } from '@/utils/mockData';

export default function UserTable({ rows = userRows }) {
  return (
    <div className="glass-table">
      <table className="min-w-full divide-y divide-white/10 text-left text-sm">
        <thead className="bg-white/10 text-slate-300">
          <tr>
            <th className="px-6 py-4 font-medium">User</th>
            <th className="px-6 py-4 font-medium">Role</th>
            <th className="px-6 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-slate-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-white/10">
              <td className="px-6 py-4 font-medium text-white">{row.name}</td>
              <td className="px-6 py-4">{row.role}</td>
              <td className="px-6 py-4">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}