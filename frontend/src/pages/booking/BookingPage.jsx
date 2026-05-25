import { FiCalendar, FiCreditCard } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import InputField from '@/components/forms/InputField';
import DatePickerField from '@/components/forms/DatePickerField';
import SelectField from '@/components/forms/SelectField';
import TextAreaField from '@/components/forms/TextAreaField';
import { useState } from 'react';
import bookingApi from '@/api/bookingApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function BookingPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  async function onConfirm(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        userId: auth.user?.id,
        fullName,
        email,
        phone,
        guests,
        checkIn,
        checkOut,
        notes,
      };
      const booking = await bookingApi.createBooking(payload);
      alert('Booking confirmed');
      navigate('/booking/history');
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
            <div className="grid gap-4 sm:grid-cols-2">
              <DatePickerField label="Check-in" value={checkIn} onChange={(d) => setCheckIn(d)} />
              <DatePickerField label="Check-out" value={checkOut} onChange={(d) => setCheckOut(d)} />
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
            <p className="text-sm text-slate-400">Azure Skyline Resort</p>
            <p className="text-2xl font-semibold text-white">Deluxe Ocean Suite</p>
            <p className="text-sm text-slate-400">4 nights | 2 adults</p>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between"><span>Room rate</span><span>$289 x 4</span></div>
            <div className="flex items-center justify-between"><span>Taxes & fees</span><span>$126</span></div>
            <div className="flex items-center justify-between"><span>Service charge</span><span>$39</span></div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold text-white">
              <span>Total</span>
              <span>$1,321</span>
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