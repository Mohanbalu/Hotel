import { motion } from 'framer-motion';

export default function PageWrapper({ title, description, actions, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className={`space-y-8 ${className}`}
    >
      {(title || description || actions) && (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="section-chip">Hotel Booking Application</span>
            {title && <h1 className="section-heading">{title}</h1>}
            {description && <p className="section-copy">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}