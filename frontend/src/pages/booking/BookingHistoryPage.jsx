import BookingCard from '@/components/cards/BookingCard';
import BookingTable from '@/components/tables/BookingTable';
import PageWrapper from '@/components/common/PageWrapper';
import { bookings } from '@/utils/mockData';

export default function BookingHistoryPage() {
  return (
    <PageWrapper
      title="Booking History"
      description="Track reservations with a table on desktop and polished booking cards on mobile."
    >
      <div className="hidden md:block">
        <BookingTable rows={bookings} />
      </div>
      <div className="grid gap-4 md:hidden">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </PageWrapper>
  );
}