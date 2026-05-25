import { FiSearch, FiCalendar, FiUsers, FiMapPin, FiCompass } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import HotelCard from '@/components/cards/HotelCard';
import { destinations, featuredHotels } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels?q=${searchQuery}`);
  };

  return (
    <PageWrapper
      title="Unveil the Extraordinary"
      description="Indulge in a handpicked collection of world-class resorts, boutique suites, and luxury sanctuaries."
    >
      {/* Premium Luxury Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl lg:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.1),_transparent_40%),_radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.06),_transparent_40%)]" />
        
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="space-y-6 text-left">
            <span className="section-chip">
              <FiCompass className="text-amber-300 animate-spin-slow" /> Luxury Travel Redefined
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-none">
              Stays that <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">Inspire Wonders</span>.
            </h2>
            <p className="max-w-xl text-base text-slate-400 leading-relaxed">
              Skip the ordinary. Access verified boutique collections, curated VIP operational amenities, and seamless reservation flows instantly.
            </p>

            {/* Segmented Search Form */}
            <form onSubmit={handleSearch} className="grid gap-3 rounded-[2rem] border border-white/5 bg-slate-950/65 p-3 backdrop-blur-2xl sm:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5 focus-within:ring-2 focus-within:ring-amber-500/20 duration-300">
                <FiSearch className="text-amber-300 text-lg" />
                <input 
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500" 
                  placeholder="Where would you like to escape to?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="primary-action px-6 py-3.5 text-sm font-bold">
                Search Escapes
              </button>
            </form>
          </div>

          {/* Quick Metrics Showcase */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="group rounded-[1.75rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl hover:border-amber-400/20 transition duration-300">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Featured Sanctuary</p>
              <p className="mt-3 text-2xl font-bold text-white group-hover:text-amber-300 transition duration-200">Skyline Resort</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">Luxury suites, custom private rooftop dining, and infinity pool views.</p>
            </div>
            
            <div className="rounded-[1.75rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Guest Experience</p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight text-white">
                4.9<span className="text-amber-300 text-2xl">★</span>
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">Highly rated for flawless check-in times and elite customer service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Featured Stays */}
      <section className="space-y-6">
        <div className="text-left">
          <span className="section-chip">Exquisite Choices</span>
          <h3 className="mt-3 text-3xl font-bold text-white tracking-tight">Our Curated Sanctuaries</h3>
          <p className="mt-2 text-sm text-slate-400">Each resort is individually vetted for exquisite interiors and scenic landscapes.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* Destinations Showcase */}
      <section className="space-y-6">
        <div className="text-left">
          <span className="section-chip">Global Escapes</span>
          <h3 className="mt-3 text-3xl font-bold text-white tracking-tight">Popular Destinations</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div 
              key={destination.name} 
              onClick={() => navigate(`/hotels?q=${destination.name}`)}
              className="group cursor-pointer rounded-[1.75rem] border border-white/5 bg-white/5 p-6 backdrop-blur-xl hover:border-amber-400/20 hover:bg-white/10 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-400/10 text-amber-300 group-hover:bg-amber-300 group-hover:text-slate-950 transition duration-300">
                  <FiMapPin />
                </div>
                <div>
                  <p className="font-bold text-white text-lg leading-snug">{destination.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{destination.hotels}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}