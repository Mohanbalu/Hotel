export default function TextAreaField({ label, className = '', ...props }) {
  return (
    <label className={`block space-y-2 ${className}`}>
      {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
      <textarea rows="4" className="w-full rounded-2xl border border-white/5 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 transition-all duration-200 focus:border-amber-400/40 focus:bg-slate-950/60 focus:ring-2 focus:ring-amber-400/10" {...props} />
    </label>
  );
}