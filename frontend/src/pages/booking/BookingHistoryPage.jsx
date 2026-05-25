import BookingCard from '@/components/cards/BookingCard';
import BookingTable from '@/components/tables/BookingTable';
import PageWrapper from '@/components/common/PageWrapper';
import { useEffect, useState } from 'react';
import bookingApi from '@/api/bookingApi';
import { useAuth } from '@/context/AuthContext';

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await bookingApi.getUserBookings(auth.user?.id);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        // handled globally
      } finally {
        setLoading(false);
      }
    }
    if (auth.user) load();
  }, [auth.user]);

  return (
    <PageWrapper
      title="Booking History"
      description="Track reservations with a table on desktop and polished booking cards on mobile."
    >
      {loading ? (
        <p className="text-slate-300">Loading bookings...</p>
      ) : (
        <>
          <div className="hidden md:block">
            <BookingTable rows={bookings} />
          </div>
          <div className="grid gap-4 md:hidden">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}