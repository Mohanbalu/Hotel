import { motion } from 'framer-motion';

export default function StatsCard({ label, value, delta, icon: Icon }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-50">{value}</p>
          <p className="mt-3 text-sm text-emerald-300">{delta}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-200">
          {Icon && <Icon className="text-xl" />}
        </div>
      </div>
    </motion.article>
  );
}