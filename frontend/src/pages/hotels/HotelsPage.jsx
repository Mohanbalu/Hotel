import { FiFilter, FiSearch, FiSliders } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import HotelCard from '@/components/cards/HotelCard';
import SelectField from '@/components/forms/SelectField';
import InputField from '@/components/forms/InputField';
import { useEffect, useState } from 'react';
import hotelApi from '@/api/hotelApi';

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  async function loadHotels(q = {}) {
    setLoading(true);
    try {
      const data = await hotelApi.getAllHotels(q);
      setHotels(Array.isArray(data) ? data : []);
    } catch (err) {
      // handled globally
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHotels();
  }, []);

  async function onSearch(e) {
    e.preventDefault();
    await loadHotels({ q: query });
  }

  return (
    <PageWrapper
      title="Hotels"
      description="Browse hotel listings with responsive filters, sorting, and an enterprise-style grid layout."
      actions={
        <>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <FiFilter /> Filters
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <FiSliders /> Sort
          </button>
        </>
      }
    >
      <section className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:grid-cols-4">
        <form onSubmit={onSearch} className="col-span-1">
          <InputField placeholder="Search hotels" label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
        <SelectField label="Location">
          <option>All Locations</option>
          <option>Dubai</option>
          <option>Singapore</option>
          <option>Bali</option>
        </SelectField>
        <SelectField label="Price Range">
          <option>Any Budget</option>
          <option>Under $200</option>
          <option>$200 - $400</option>
          <option>$400+</option>
        </SelectField>
        <div className="flex items-end">
          <button onClick={onSearch} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
            <FiSearch /> Apply
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {loading ? (
          <p className="text-slate-300">Loading hotels...</p>
        ) : (
          hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
        )}
      </section>
    </PageWrapper>
  );
}