import { motion } from 'framer-motion';

export default function StatsCard({ label, value, delta, icon: Icon }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="soft-card-strong p-5 transition duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          <p className="mt-3 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">{delta}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-amber-200">
          {Icon && <Icon className="text-xl" />}
        </div>
      </div>
    </motion.article>
  );
}