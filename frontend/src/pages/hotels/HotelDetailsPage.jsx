import { FiAward, FiBookmark, FiMapPin, FiStar } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import { useEffect, useState } from 'react';
import hotelApi from '@/api/hotelApi';

export default function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [hotelData, roomsData] = await Promise.all([
          hotelApi.getHotelById(id),
          hotelApi.getRoomsByHotel(id)
        ]);

        const roomsList = Array.isArray(roomsData) ? roomsData : [];
        const prices = roomsList.map(r => r.pricePerNight).filter(p => p != null);
        
        const augmentedHotel = {
          ...hotelData,
          roomsCount: roomsList.length,
          suitesCount: roomsList.filter(r => r.capacity >= 3).length,
          capacity: roomsList.reduce((max, r) => Math.max(max, r.capacity || 0), 0) || 4,
          startingPrice: prices.length > 0 ? Math.min(...prices) : 289
        };
        
        setHotel(augmentedHotel);
      } catch (err) {
        // handled globally
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  return (
    <PageWrapper
      title={hotel ? hotel.name : 'Hotel Details'}
      description="Immerse yourself in world-class amenities, premium room sizes, and award-winning services."
    >
      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          {/* Immersive Photo Showcase */}
          <div className="grid gap-4 sm:grid-cols-2">
            {(hotel?.imageUrl
              ? [hotel.imageUrl]
              : hotel?.images || [
                  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
                  'https://images.unsplash.com/photo-1578774204375-87efbda3f1c5?auto=format&fit=crop&w=1200&q=80',
                ]
            ).map((image, index) => (
              <div key={index} className={`overflow-hidden rounded-[2rem] border border-white/5 shadow-lg group ${hotel?.imageUrl ? 'sm:col-span-2' : ''}`}>
                <img
                  src={image}
                  alt="Hotel preview"
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Hotel Description Panel */}
          <div className="rounded-[2rem] border border-white/5 bg-slate-950/40 p-6 backdrop-blur-2xl">
            <h2 className="text-2xl font-bold text-white tracking-tight">{hotel?.name || `Hotel Overview #${id}`}</h2>
            <p className="mt-4 text-sm leading-8 text-slate-400">
              {hotel?.description || 'Indulge in absolute comfort and elegance. This premium resort is equipped with state-of-the-art furnishings, high-speed connectivity, and curated VIP customer service interfaces to guarantee an unforgettable stay.'}
            </p>
            
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Total Rooms', hotel?.roomsCount || '48'],
                ['Suites Available', hotel?.suitesCount || '12'],
                ['Max Capacity', hotel?.capacity ? `${hotel.capacity} Guests` : '4 Guests'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/5 bg-slate-950/80 p-4 text-center">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</p>
                  <p className="mt-2 text-xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Sidebar */}
        <aside className="space-y-6">
          {/* Reservation Card */}
          <div className="rounded-[2rem] border border-white/5 bg-slate-950/40 p-6 backdrop-blur-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Starting from</p>
            <p className="mt-1 text-4xl font-black text-white">₹{hotel?.startingPrice || 289}</p>
            
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400 border-t border-b border-white/5 py-3">
              <span className="flex items-center gap-1.5 text-amber-300">
                <FiStar className="fill-amber-300" /> {hotel?.rating || '4.9'} Excellent
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin className="text-cyan-400" /> {hotel?.location || 'Dubai, UAE'}
              </span>
            </div>

            <button 
              onClick={() => navigate(`/booking?hotelId=${id}`)} 
              className="primary-action w-full mt-6 py-3.5 text-sm font-bold shadow-lg"
            >
              <FiBookmark /> Reserve Sanctuary
            </button>
          </div>

          {/* Dynamic Amenities Card */}
          <div className="rounded-[2rem] border border-white/5 bg-slate-950/40 p-6 backdrop-blur-2xl">
            <h3 className="text-lg font-bold text-white tracking-tight">Included Amenities</h3>
            <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs text-slate-300">
              {(hotel?.amenities || ['Wi-Fi', 'Pool', 'Spa', 'Gym', 'Bar', 'Room Service']).map((amenity) => (
                <div key={amenity} className="rounded-xl border border-white/5 bg-slate-950/80 px-3 py-2.5 text-center font-medium">
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="rounded-[2rem] border border-white/5 bg-slate-950/40 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-bold uppercase tracking-wider mb-4">
              <FiAward /> Guest Verification Ratings
            </div>
            <div className="space-y-3.5 text-xs text-slate-300">
              {[
                ['Cleanliness', hotel?.cleanliness || '4.9'],
                ['Service Quality', hotel?.service || '4.8'],
                ['Value for Budget', hotel?.value || '4.7'],
              ].map(([metric, value]) => (
                <div key={metric} className="space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span>{metric}</span>
                    <span className="text-amber-300 font-bold">{value}/5.0</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500" 
                      style={{ width: `${(Number(value) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </PageWrapper>
  );
}