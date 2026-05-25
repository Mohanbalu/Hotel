import { FiFilter, FiSearch, FiSliders, FiX, FiChevronDown, FiCheck } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import HotelCard from '@/components/cards/HotelCard';
import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hotelApi from '@/api/hotelApi';

const SORT_OPTIONS = [
  { value: 'default',      label: 'Default'            },
  { value: 'price_asc',    label: 'Price: Low → High'  },
  { value: 'price_desc',   label: 'Price: High → Low'  },
  { value: 'rating_desc',  label: 'Rating: Best First'  },
  { value: 'name_asc',     label: 'Name: A → Z'        },
  { value: 'name_desc',    label: 'Name: Z → A'        },
];

export default function HotelsPage() {
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading]     = useState(false);

  // Filter / sort state
  const [query,          setQuery]          = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFilter,    setPriceFilter]    = useState('any');
  const [sortBy,         setSortBy]         = useState('default');

  // Panel visibility
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSortMenu,    setShowSortMenu]    = useState(false);
  const sortRef = useRef(null);

  // Close sort menu when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Unique cities from loaded data
  const uniqueCities = useMemo(() => {
    const cities = allHotels.map(h => h.city).filter(Boolean);
    return [...new Set(cities)].sort();
  }, [allHotels]);

  async function loadHotels() {
    setLoading(true);
    try {
      const [hotelsData, roomsData] = await Promise.all([
        hotelApi.getAllHotels(),
        hotelApi.getAllRooms(),
      ]);

      const hotelsList = Array.isArray(hotelsData) ? hotelsData : [];
      const roomsList  = Array.isArray(roomsData)  ? roomsData  : [];

      const roomsMap = {};
      roomsList.forEach(r => {
        const hotelId = r.hotel?.id;
        if (hotelId) {
          if (!roomsMap[hotelId]) roomsMap[hotelId] = [];
          roomsMap[hotelId].push(r);
        }
      });

      const augmented = hotelsList.map(hotel => {
        const hotelRooms = roomsMap[hotel.id] || [];
        const prices = hotelRooms.map(r => r.pricePerNight).filter(p => p != null);
        return {
          ...hotel,
          roomsCount:    hotelRooms.length,
          suitesCount:   hotelRooms.filter(r => r.capacity >= 3).length,
          capacity:      hotelRooms.reduce((max, r) => Math.max(max, r.capacity || 0), 0) || 4,
          startingPrice: prices.length > 0 ? Math.min(...prices) : 289,
        };
      });

      setAllHotels(augmented);
    } catch (err) {
      // handled globally
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadHotels(); }, []);

  // --- Client-side filter + sort ---
  const filteredHotels = useMemo(() => {
    let list = [...allHotels];

    // Keyword
    if (query.trim()) {
      const lq = query.trim().toLowerCase();
      list = list.filter(h =>
        h.name?.toLowerCase().includes(lq) ||
        h.city?.toLowerCase().includes(lq) ||
        h.location?.toLowerCase().includes(lq)
      );
    }

    // City / location
    if (locationFilter !== 'all') {
      list = list.filter(h => h.city?.toLowerCase() === locationFilter.toLowerCase());
    }

    // Price range
    if (priceFilter === 'under200') {
      list = list.filter(h => h.startingPrice < 200);
    } else if (priceFilter === '200to400') {
      list = list.filter(h => h.startingPrice >= 200 && h.startingPrice <= 400);
    } else if (priceFilter === 'above400') {
      list = list.filter(h => h.startingPrice > 400);
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':   list.sort((a, b) => a.startingPrice - b.startingPrice);  break;
      case 'price_desc':  list.sort((a, b) => b.startingPrice - a.startingPrice);  break;
      case 'rating_desc': list.sort((a, b) => (b.rating || 0) - (a.rating || 0));  break;
      case 'name_asc':    list.sort((a, b) => a.name?.localeCompare(b.name));       break;
      case 'name_desc':   list.sort((a, b) => b.name?.localeCompare(a.name));       break;
      default: break;
    }

    return list;
  }, [allHotels, query, locationFilter, priceFilter, sortBy]);

  const hasActiveFilters =
    query.trim() || locationFilter !== 'all' || priceFilter !== 'any' || sortBy !== 'default';

  function clearFilters() {
    setQuery('');
    setLocationFilter('all');
    setPriceFilter('any');
    setSortBy('default');
  }

  const activeSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || 'Sort';
  const activeFilterCount = [
    locationFilter !== 'all',
    priceFilter !== 'any',
  ].filter(Boolean).length;

  return (
    <PageWrapper
      title="Hotels"
      description="Browse hotel listings with responsive filters, sorting, and an enterprise-style grid layout."
      actions={
        <>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-300 hover:bg-rose-500/20 transition"
            >
              <FiX /> Clear All
            </button>
          )}

          {/* ── Filters toggle ── */}
          <button
            onClick={() => setShowFilterPanel(p => !p)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              showFilterPanel || activeFilterCount > 0
                ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <FiFilter />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-950">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* ── Sort dropdown ── */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setShowSortMenu(p => !p)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                sortBy !== 'default'
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'
              }`}
            >
              <FiSliders />
              {sortBy !== 'default' ? activeSortLabel : 'Sort'}
              <FiChevronDown className={`transition-transform duration-200 ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit={{    opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition ${
                        sortBy === opt.value
                          ? 'bg-cyan-400/10 text-cyan-300 font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.value && <FiCheck className="text-cyan-400 shrink-0" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      }
    >
      {/* ── Collapsible Filter Panel ── */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.section
            key="filter-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0       }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="rounded-3xl border border-amber-400/10 bg-slate-950/60 p-5 backdrop-blur-2xl">
              <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr_1fr_auto]">
                {/* Keyword */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Keywords</label>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-slate-950/60 px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-amber-500/20 duration-300">
                    <FiSearch className="text-amber-300 shrink-0" />
                    <input
                      className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
                      placeholder="Search resort name or city..."
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    />
                    {query && (
                      <button onClick={() => setQuery('')} className="text-slate-500 hover:text-slate-300 transition">
                        <FiX />
                      </button>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Location</label>
                  <select
                    value={locationFilter}
                    onChange={e => setLocationFilter(e.target.value)}
                    className="w-full rounded-2xl border border-white/5 bg-slate-950/60 px-3.5 py-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
                  >
                    <option value="all"    className="bg-slate-950">All Locations</option>
                    {uniqueCities.map(city => (
                      <option key={city} value={city} className="bg-slate-950">{city}</option>
                    ))}
                  </select>
                </div>

                {/* Price range */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Price Range</label>
                  <select
                    value={priceFilter}
                    onChange={e => setPriceFilter(e.target.value)}
                    className="w-full rounded-2xl border border-white/5 bg-slate-950/60 px-3.5 py-3 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
                  >
                    <option value="any"      className="bg-slate-950">Any Budget</option>
                    <option value="under200" className="bg-slate-950">Under ₹200</option>
                    <option value="200to400" className="bg-slate-950">₹200 – ₹400</option>
                    <option value="above400" className="bg-slate-950">₹400+</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <button onClick={clearFilters} className="primary-action w-full px-6 py-3 text-sm font-bold">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results info bar */}
      {!loading && (hasActiveFilters || allHotels.length > 0) && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing{' '}
            <span className="text-white font-semibold">{filteredHotels.length}</span>
            {' '}of{' '}
            <span className="text-white font-semibold">{allHotels.length}</span>
            {' '}hotels
          </span>
          {sortBy !== 'default' && (
            <span className="text-cyan-400">Sorted by: {activeSortLabel}</span>
          )}
        </div>
      )}

      {/* Hotel Grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-3 flex items-center justify-center gap-3 py-20 text-slate-400">
            <svg className="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading hotels...
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="col-span-3 py-24 text-center">
            <div className="text-5xl mb-4">🏨</div>
            <p className="text-slate-300 text-lg font-semibold">No hotels match your filters</p>
            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or clearing all filters.</p>
            <button onClick={clearFilters} className="mt-6 primary-action px-6 py-2.5 text-sm">
              Clear Filters
            </button>
          </div>
        ) : (
          filteredHotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)
        )}
      </section>
    </PageWrapper>
  );
}