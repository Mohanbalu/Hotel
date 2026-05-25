export default function InputField({ label, error, icon, className = '', ...props }) {
  return (
    <label className={`block space-y-2 ${className}`}>
      {label && <span className="text-sm font-medium text-slate-100">{label}</span>}
      <div className="field-shell">
        {icon && <span className="text-slate-400">{icon}</span>}
        <input className="field-input" {...props} />
      </div>
      {error && <span className="text-xs text-rose-200">{error}</span>}
    </label>
  );
}