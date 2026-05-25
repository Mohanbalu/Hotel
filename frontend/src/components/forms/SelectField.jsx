export default function SelectField({ label, children, className = '', ...props }) {
  return (
    <label className={`block space-y-2 ${className}`}>
      {label && <span className="text-sm font-medium text-slate-100">{label}</span>}
      <select className="field-select" {...props}>
        {children}
      </select>
    </label>
  );
}