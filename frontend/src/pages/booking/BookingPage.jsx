import { FiCalendar, FiCreditCard } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import InputField from '@/components/forms/InputField';
import DatePickerField from '@/components/forms/DatePickerField';
import SelectField from '@/components/forms/SelectField';
import TextAreaField from '@/components/forms/TextAreaField';
import { useState, useEffect } from 'react';
import bookingApi from '@/api/bookingApi';
import hotelApi from '@/api/hotelApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get('hotelId');
  
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState(getTodayDateString());
  const [checkOut, setCheckOut] = useState(getTomorrowDateString());
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    async function loadHotelAndRooms() {
      if (!hotelId) return;
      setLoadingDetails(true);
      try {
        const hotelData = await hotelApi.getHotelById(hotelId);
        setHotel(hotelData);
        
        const roomsData = await hotelApi.getRoomsByHotel(hotelId);
        setRooms(roomsData || []);
        
        const availableRoom = (roomsData || []).find(r => r.available);
        if (availableRoom) {
          setSelectedRoomId(availableRoom.id);
        } else if (roomsData && roomsData.length > 0) {
          setSelectedRoomId(roomsData[0].id);
        }
      } catch (err) {
        console.error('Failed to load booking details', err);
      } finally {
        setLoadingDetails(false);
      }
    }
    loadHotelAndRooms();
  }, [hotelId]);

  useEffect(() => {
    if (auth.user) {
      setFullName(auth.user.username || '');
      setEmail(auth.user.email || '');
    }
  }, [auth.user]);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);
  const roomPrice = selectedRoom ? selectedRoom.pricePerNight : (hotel?.startingPrice || 289);
  
  const getNights = () => {
    if (!checkIn || !checkOut) return 4;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    if (diff <= 0) return 1;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = getNights();
  const roomRateTotal = roomPrice * nights;
  const taxes = Math.round(roomRateTotal * 0.1);
  const serviceCharge = 39;
  const total = roomRateTotal + taxes + serviceCharge;

  async function onConfirm(e) {
    e.preventDefault();
    if (!selectedRoomId) {
      alert('No rooms available for booking in this hotel.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        userId: auth.user?.id || 1,
        roomId: selectedRoomId,
        checkIn,
        checkOut,
      };
      await bookingApi.createBooking(payload);
      alert('Booking confirmed');
      navigate('/booking-history');
    } catch (err) {
      // handled globally
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper
      title="Booking"
      description="Booking summary, date selection, guest details, and price breakdown in a polished reservation flow."
    >
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Guest Details</h2>
          <form onSubmit={onConfirm} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Full Name" placeholder="Ava Johnson" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <InputField label="Email" type="email" placeholder="ava@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputField label="Phone" placeholder="+1 555 000 000" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <SelectField label="Guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </SelectField>
            </div>
            {rooms.length > 0 && (
              <SelectField 
                label="Select Room" 
                value={selectedRoomId || ''} 
                onChange={(e) => setSelectedRoomId(Number(e.target.value))}
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id} disabled={!r.available}>
                    Room {r.number} (Max Capacity: {r.capacity} Guests) - ₹{r.pricePerNight}/night {!r.available ? '(Booked/Unavailable)' : ''}
                  </option>
                ))}
              </SelectField>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <DatePickerField label="Check-in" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              <DatePickerField label="Check-out" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <TextAreaField label="Special Requests" placeholder="Late check-in, extra pillows, airport pickup" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button disabled={submitting} className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              <FiCalendar /> {submitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </form>
        </div>

        <aside className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Booking Summary</h2>
          <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <p className="text-sm text-slate-400">{hotel?.location || 'Loading...'}</p>
            <p className="text-2xl font-semibold text-white">{hotel?.name || 'Loading...'}</p>
            <p className="text-sm text-slate-400">
              {nights} night{nights > 1 ? 's' : ''} | {guests} guest{guests > 1 ? 's' : ''}
            </p>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Room rate {selectedRoom ? `(Room ${selectedRoom.number})` : ''}</span>
              <span>₹{roomPrice} x {nights}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Taxes & fees (10%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Service charge</span>
              <span>₹{serviceCharge}</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold text-white">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-sm text-slate-300">
            <FiCreditCard className="mb-3 text-xl text-cyan-300" />
            Secure payment placeholder ready for future checkout integration.
          </div>
        </aside>
      </section>
    </PageWrapper>
  );
}