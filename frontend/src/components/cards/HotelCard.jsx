import { motion } from 'framer-motion';
import { FiMapPin, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  return (
    <motion.article whileHover={{ y: -8 }} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="relative h-56 overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">{hotel.price}</div>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{hotel.name}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <FiMapPin />
            <span>{hotel.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-amber-300">
            <FiStar />
            <span>{hotel.rating}/5</span>
          </div>
          <Link to={`/hotels/${hotel.id}`} className="rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300">
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}