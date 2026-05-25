export default function SelectField({ label, children, className = '', ...props }) {
  return (
    <label className={`block space-y-2 ${className}`}>
      {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
      <select className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20" {...props}>
        {children}
      </select>
    </label>
  );
}