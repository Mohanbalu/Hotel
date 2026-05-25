export default function InputField({ label, error, icon, className = '', ...props }) {
  return (
    <label className={`block space-y-2 ${className}`}>
      {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 transition focus-within:border-cyan-400/50 focus-within:ring-2 focus-within:ring-cyan-400/20">
        {icon && <span className="text-slate-400">{icon}</span>}
        <input className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500" {...props} />
      </div>
      {error && <span className="text-xs text-rose-300">{error}</span>}
    </label>
  );
}