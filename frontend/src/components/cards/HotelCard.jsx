import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  const displayPrice = hotel.price || (hotel.startingPrice ? `₹${hotel.startingPrice}/night` : '₹289/night');
  const displayImage = hotel.imageUrl || hotel.image || (hotel.images && hotel.images[0]) || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.article 
      whileHover={{ y: -8, scale: 1.01 }} 
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="soft-card overflow-hidden border border-white/5 bg-slate-950/40 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/5 duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={displayImage} alt={hotel.name} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030710] via-transparent to-transparent" />
        <div className="absolute right-4 top-4 rounded-full border border-amber-400/20 bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md">
          {displayPrice}
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-white line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FiMapPin className="text-cyan-400" />
            <span>{hotel.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
            <FiStar className="fill-amber-300 text-amber-300" />
            <span>{hotel.rating || '4.8'}</span>
            <span className="text-[10px] font-normal text-slate-500">(1.2k reviews)</span>
          </div>
          <Link to={`/hotels/${hotel.id}`} className="primary-action px-4 py-2 text-xs">
            View Details
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}