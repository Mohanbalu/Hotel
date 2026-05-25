import { FiAward, FiBookmark, FiMapPin, FiStar } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';

export default function HotelDetailsPage() {
  const { id } = useParams();

  return (
    <PageWrapper
      title="Hotel Details"
      description="Hotel image gallery, room information, amenities, ratings, and booking actions in one responsive view."
    >
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1582719478185-2cb6d6f3d6ce?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
            ].map((image) => (
              <img key={image} src={image} alt="Hotel preview" className="h-56 w-full rounded-[1.5rem] object-cover" />
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Hotel Overview #{id}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Premium room descriptions, booking options, and lifestyle visuals are arranged for an executive-grade hotel detail experience.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ['Luxury Rooms', '48'],
                ['Suites', '12'],
                ['Guests', '230+'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-400">Starting from</p>
            <p className="mt-2 text-4xl font-semibold text-white">$289</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-amber-300">
              <FiStar /> 4.9 Excellent
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <FiMapPin /> Dubai Marina, UAE
            </div>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              <FiBookmark /> Book Now
            </button>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white">Amenities</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
              {['Wi-Fi', 'Pool', 'Spa', 'Gym', 'Airport Pickup', 'Breakfast'].map((amenity) => (
                <div key={amenity} className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2">
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-amber-300">
              <FiAward /> Guest Ratings
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Cleanliness: 4.9</p>
              <p>Service: 4.8</p>
              <p>Value: 4.7</p>
            </div>
          </div>
        </aside>
      </section>
    </PageWrapper>
  );
}