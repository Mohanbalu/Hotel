import { FiSearch } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import HotelCard from '@/components/cards/HotelCard';
import { destinations, featuredHotels } from '@/utils/mockData';

export default function HomePage() {
  return (
    <PageWrapper
      title="Find premium stays with a refined booking experience"
      description="Modern SaaS-inspired frontend skeleton for hotel discovery, reservations, and admin workflows."
    >
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-hero-grid p-8 shadow-2xl shadow-slate-950/25 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
              Enterprise hotel booking
            </span>
            <h2 className="max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Explore, compare, and reserve with a clean dashboard-grade interface.
            </h2>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              This skeleton is built for hackathons and major project demos, with responsive layouts, reusable components, and motion-rich UI.
            </p>

            <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-3 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-950/60 px-4 py-3">
                <FiSearch className="text-cyan-300" />
                <input className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500" placeholder="Search destination, hotel, or room type" />
              </div>
              <button className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Search Hotels
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm text-slate-400">Featured property</p>
              <p className="mt-3 text-2xl font-semibold text-white">Skyline Resort</p>
              <p className="mt-2 text-sm text-slate-300">Luxury suites, rooftop dining, and ocean views.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm text-slate-400">Average rating</p>
              <p className="mt-3 text-4xl font-semibold text-white">4.8/5</p>
              <p className="mt-2 text-sm text-slate-300">Based on 12k+ verified guest reviews.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">Featured Hotels</h3>
            <p className="mt-2 text-sm text-slate-400">Curated properties with polished presentation cards.</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h3 className="text-2xl font-semibold text-white">Popular Destinations</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div key={destination.name} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-lg font-semibold text-white">{destination.name}</p>
              <p className="mt-2 text-sm text-slate-400">{destination.hotels}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}