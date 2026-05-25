export const featuredHotels = [
  {
    id: 1,
    name: 'Azure Skyline Resort',
    location: 'Dubai, UAE',
    price: '$289/night',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Marina Grand Suites',
    location: 'Singapore',
    price: '$240/night',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1578774204375-87efbda3f1c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Aurora Bay Retreat',
    location: 'Bali, Indonesia',
    price: '$199/night',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210d8?auto=format&fit=crop&w=1200&q=80',
  },
];

export const destinations = [
  { name: 'Paris', hotels: '124 hotels' },
  { name: 'Dubai', hotels: '98 hotels' },
  { name: 'Bali', hotels: '76 hotels' },
  { name: 'Tokyo', hotels: '143 hotels' },
];

export const bookings = [
  {
    id: 'BK-1001',
    hotel: 'Azure Skyline Resort',
    guest: 'Ava Johnson',
    date: 'Aug 12, 2026',
    status: 'Confirmed',
    amount: '$1,148',
  },
  {
    id: 'BK-1002',
    hotel: 'Marina Grand Suites',
    guest: 'Noah Smith',
    date: 'Aug 18, 2026',
    status: 'Pending',
    amount: '$840',
  },
  {
    id: 'BK-1003',
    hotel: 'Aurora Bay Retreat',
    guest: 'Mia Brown',
    date: 'Sep 01, 2026',
    status: 'Cancelled',
    amount: '$660',
  },
];

export const hotelRows = [
  { id: 'HT-01', name: 'Azure Skyline Resort', city: 'Dubai', rooms: 48, status: 'Live' },
  { id: 'HT-02', name: 'Marina Grand Suites', city: 'Singapore', rooms: 34, status: 'Live' },
  { id: 'HT-03', name: 'Aurora Bay Retreat', city: 'Bali', rooms: 26, status: 'Draft' },
];

export const userRows = [
  { id: 'USR-01', name: 'Ava Johnson', role: 'Guest', status: 'Active' },
  { id: 'USR-02', name: 'Noah Smith', role: 'Manager', status: 'Active' },
  { id: 'USR-03', name: 'Mia Brown', role: 'Guest', status: 'Inactive' },
];