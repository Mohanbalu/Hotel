import { motion } from 'framer-motion';

export default function PageWrapper({ title, description, actions, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className={`space-y-6 ${className}`}
    >
      {(title || description || actions) && (
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            {title && <h1 className="text-3xl font-semibold tracking-tight text-slate-50">{title}</h1>}
            {description && <p className="max-w-3xl text-sm leading-6 text-slate-300">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}