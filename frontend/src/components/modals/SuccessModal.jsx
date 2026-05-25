import { AnimatePresence, motion } from 'framer-motion';

export default function SuccessModal({ open, title, description, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="w-full max-w-md rounded-[1.75rem] border border-white/10 bg-slate-950 p-6 text-center shadow-2xl"
          >
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-sm font-semibold text-emerald-300">
              OK
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950">
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}