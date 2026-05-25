import { FiDollarSign, FiTrendingUp, FiUsers, FiCalendar, FiPlus, FiEdit2, FiTrash2, FiActivity, FiGrid, FiHome, FiBell } from 'react-icons/fi';
import PageWrapper from '@/components/common/PageWrapper';
import StatsCard from '@/components/cards/StatsCard';
import BookingTable from '@/components/tables/BookingTable';
import InputField from '@/components/forms/InputField';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import userApi from '@/api/userApi';
import bookingApi from '@/api/bookingApi';
import hotelApi from '@/api/hotelApi';

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  const setActiveTab = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  // Modals state
  const [hotelModalOpen, setHotelModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null); // null = Add, object = Edit
  const [hotelForm, setHotelForm] = useState({ name: '', city: '', location: '', rating: 4.5, imageUrl: '' });

  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null); // null = Add, object = Edit
  const [targetHotel, setTargetHotel] = useState(null); // if adding room directly from hotel row
  const [roomForm, setRoomForm] = useState({ hotelId: '', number: '', capacity: 2, pricePerNight: 120, available: true });

  const [roomFilterHotelId, setRoomFilterHotelId] = useState('all');

  async function loadData() {
    setLoading(true);
    try {
      const [u, b, h, r] = await Promise.all([
        userApi.getAllUsers(),
        bookingApi.getAllBookings(),
        hotelApi.getAllHotels(),
        hotelApi.getAllRooms(),
      ]);
      setUsers(Array.isArray(u) ? u : []);
      setBookings(Array.isArray(b) ? b : []);
      setHotels(Array.isArray(h) ? h : []);
      setRooms(Array.isArray(r) ? r : []);
    } catch (err) {
      // handled globally
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // CRUD Actions
  async function handleSaveHotel(e) {
    e.preventDefault();
    try {
      if (editingHotel) {
        await hotelApi.updateHotel(editingHotel.id, hotelForm);
        alert('Hotel details updated successfully');
      } else {
        await hotelApi.addHotel(hotelForm);
        alert('New hotel created successfully');
      }
      setHotelModalOpen(false);
      loadData();
    } catch (err) {
      alert('Failed to save hotel. Check data format.');
    }
  }

  async function handleDeleteHotel(id) {
    if (!window.confirm('Are you sure you want to delete this hotel? All associated rooms and reservations will be affected.')) return;
    try {
      await hotelApi.deleteHotel(id);
      alert('Hotel removed successfully');
      loadData();
    } catch (err) {
      alert('Failed to remove hotel.');
    }
  }

  async function handleSaveRoom(e) {
    e.preventDefault();
    try {
      const selectedHotelId = targetHotel ? targetHotel.id : roomForm.hotelId;
      if (!selectedHotelId) {
        alert('Please select a hotel.');
        return;
      }

      const payload = {
        hotel: { id: Number(selectedHotelId) },
        number: roomForm.number,
        capacity: Number(roomForm.capacity),
        pricePerNight: Number(roomForm.pricePerNight),
        available: roomForm.available,
      };

      if (editingRoom) {
        await hotelApi.updateRoom(editingRoom.id, payload);
        alert(`Room ${roomForm.number} updated successfully`);
      } else {
        await hotelApi.addRoom(payload);
        alert(`Room ${roomForm.number} added successfully`);
      }
      setRoomModalOpen(false);
      loadData();
    } catch (err) {
      alert('Failed to save room.');
    }
  }

  async function handleDeleteRoom(id) {
    if (!window.confirm('Are you sure you want to delete this room? This cannot be undone.')) return;
    try {
      await hotelApi.deleteRoom(id);
      alert('Room removed successfully');
      loadData();
    } catch (err) {
      alert('Failed to remove room.');
    }
  }

  async function handleCancelBooking(id) {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      await bookingApi.cancelBooking(id);
      alert('Booking cancelled successfully');
      loadData();
    } catch (err) {
      alert('Failed to cancel booking.');
    }
  }

  const openAddHotel = () => {
    setEditingHotel(null);
    setHotelForm({ name: '', city: '', location: '', rating: 4.5, imageUrl: '' });
    setHotelModalOpen(true);
  };

  const openEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setHotelForm({ name: hotel.name, city: hotel.city, location: hotel.location || '', rating: hotel.rating || 4.5, imageUrl: hotel.imageUrl || '' });
    setHotelModalOpen(true);
  };

  const openAddRoom = (hotel = null) => {
    setEditingRoom(null);
    setTargetHotel(hotel);
    setRoomForm({
      hotelId: hotel ? hotel.id.toString() : (hotels[0]?.id?.toString() || ''),
      number: '',
      capacity: 2,
      pricePerNight: 120,
      available: true
    });
    setRoomModalOpen(true);
  };

  const openEditRoom = (room) => {
    setEditingRoom(room);
    setTargetHotel(room.hotel || null);
    setRoomForm({
      hotelId: room.hotel?.id?.toString() || '',
      number: room.number,
      capacity: room.capacity,
      pricePerNight: room.pricePerNight,
      available: room.available
    });
    setRoomModalOpen(true);
  };

  const filteredRooms = roomFilterHotelId === 'all'
    ? rooms
    : rooms.filter(r => r.hotel?.id?.toString() === roomFilterHotelId);

  // ── Real stats derived from DB data ─────────────────────────────────────
  const totalRevenue = useMemo(() => {
    return bookings.reduce((sum, b) => {
      if (!b.checkIn || !b.checkOut || !b.room?.pricePerNight) return sum;
      const nights = Math.max(1, Math.round(
        (new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24)
      ));
      return sum + b.room.pricePerNight * nights;
    }, 0);
  }, [bookings]);

  const availableRooms  = useMemo(() => rooms.filter(r => r.available).length, [rooms]);
  const occupiedRooms   = useMemo(() => rooms.filter(r => !r.available).length, [rooms]);
  const occupancyPct    = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;

  // Real stats cards
  const liveStats = useMemo(() => [
    { label: 'Total Bookings',  value: bookings.length.toString(), delta: `${rooms.length} rooms`, icon: FiBell },
    { label: 'Active Hotels',   value: hotels.length.toString(),   delta: `${rooms.length} rooms total`, icon: FiHome },
    { label: 'Total Revenue',   value: `₹${totalRevenue.toLocaleString('en-IN')}`, delta: `${occupancyPct}% occupancy`, icon: FiDollarSign },
  ], [bookings, hotels, rooms, totalRevenue, occupancyPct]);

  // Weekly bookings chart — last 6 weeks from today
  const { revenueWeeks, revenueLabels, revenueTooltips } = useMemo(() => {
    const weeks = [];
    const labels = [];
    const tooltips = [];
    const now = new Date();
    for (let w = 5; w >= 0; w--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - w * 7 - 6);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(now);
      weekEnd.setDate(now.getDate() - w * 7);
      weekEnd.setHours(23, 59, 59, 999);

      const weekBookings = bookings.filter(b => {
        if (!b.checkIn) return false;
        const d = new Date(b.checkIn);
        return d >= weekStart && d <= weekEnd;
      });
      const weekRevenue = weekBookings.reduce((sum, b) => {
        if (!b.checkOut || !b.room?.pricePerNight) return sum;
        const nights = Math.max(1, Math.round((new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24)));
        return sum + b.room.pricePerNight * nights;
      }, 0);
      weeks.push(weekRevenue);
      labels.push(`W${6 - w}`);
      tooltips.push(`${weekBookings.length} bookings · ₹${weekRevenue.toLocaleString('en-IN')}`);
    }
    // normalise to percentage heights (max = 100%)
    const maxVal = Math.max(...weeks, 1);
    return { revenueWeeks: weeks.map(v => Math.round((v / maxVal) * 90) + 10), revenueLabels: labels, revenueTooltips: tooltips };
  }, [bookings]);

  // Occupancy chart — per hotel (up to 7)
  const { occupancyDays, occupancyLabels } = useMemo(() => {
    if (hotels.length === 0) return { occupancyDays: [0], occupancyLabels: ['—'] };
    const slice = hotels.slice(0, 7);
    const days = slice.map(h => {
      const hotelRooms = rooms.filter(r => r.hotel?.id === h.id);
      if (hotelRooms.length === 0) return 0;
      const occ = hotelRooms.filter(r => !r.available).length;
      return Math.round((occ / hotelRooms.length) * 100);
    });
    const labels = slice.map(h => h.name.substring(0, 6));
    return { occupancyDays: days, occupancyLabels: labels };
  }, [hotels, rooms]);

  const peakOccupancy = occupancyDays.length > 0 ? Math.max(...occupancyDays) : 0;
  const avgWeeklyRevenue = revenueWeeks.length > 0
    ? Math.round(totalRevenue / 6)
    : 0;

  if (loading && bookings.length === 0) {
    return (
      <PageWrapper
        title="Admin Dashboard"
        description="Executive operational insights, financial tracking, occupancy metrics, and guest reservation logs."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="soft-card p-6 h-32 animate-pulse bg-slate-900/40 border border-white/5" />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="soft-card p-8 h-80 animate-pulse bg-slate-900/40 border border-white/5" />
          <div className="soft-card p-8 h-80 animate-pulse bg-slate-900/40 border border-white/5" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="Admin Dashboard"
      description="Executive operational insights, financial tracking, occupancy metrics, and guest reservation logs."
    >
      {/* Sub tabs navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {[
          { id: 'overview', label: 'Overview', icon: FiActivity },
          { id: 'hotels', label: 'Manage Hotels', icon: FiGrid },
          { id: 'rooms', label: 'Manage Rooms', icon: FiGrid },
          { id: 'bookings', label: 'Manage Bookings', icon: FiCalendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
            }`}
          >
            <tab.icon className="text-base" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          <section className="grid gap-5 md:grid-cols-3">
            {liveStats.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6 soft-card p-6 md:p-8 border border-white/5 hover:border-amber-500/10 hover:shadow-2xl hover:shadow-amber-500/5 duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Operational Analytics</h2>
                  <p className="text-xs text-slate-400 mt-1">Weekly performance index overview</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-amber-300 flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                  Live Feed
                </span>
              </div>

              <div id="analytics" className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Weekly Revenue Flow</span>
                    <span className="text-sm font-bold text-white">₹{avgWeeklyRevenue.toLocaleString('en-IN')} Avg</span>
                  </div>
                  <div className="flex h-44 items-end gap-3 px-2">
                    {revenueWeeks.map((height, index) => (
                      <div className="group relative flex flex-col items-center justify-end h-full w-full" key={index}>
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-950 border border-amber-400/30 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-lg shadow-xl transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
                          {revenueTooltips[index]}
                        </span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                          className="w-full rounded-t-xl bg-gradient-to-t from-amber-500 to-amber-400/40 hover:from-amber-300 hover:to-amber-400 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                        />
                        <span className="text-[10px] text-slate-500 mt-2 font-medium">{revenueLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Occupancy by Hotel</span>
                    <span className="text-sm font-bold text-white">{peakOccupancy}% Peak</span>
                  </div>
                  <div className="flex h-44 items-end gap-2.5 px-2">
                    {occupancyDays.map((height, index) => (
                      <div className="group relative flex flex-col items-center justify-end h-full w-full" key={index}>
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-950 border border-cyan-400/30 text-cyan-300 text-[10px] px-1.5 py-0.5 rounded-lg shadow-xl transition-all duration-200 pointer-events-none whitespace-nowrap z-10">
                          {height}% occupied
                        </span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                          className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-cyan-400/40 hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                        />
                        <span className="text-[10px] text-slate-500 mt-2 font-medium">{occupancyLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 soft-card p-6 md:p-8 border border-white/5 hover:border-amber-500/10 hover:shadow-2xl hover:shadow-amber-500/5 duration-300">
              <div>
                <h2 className="text-xl font-semibold text-white">Financial Highlights</h2>
                <p className="text-xs text-slate-400 mt-1">Realtime cash flow & registration metrics</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {[
                  { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: FiDollarSign, detail: `From ${bookings.length} bookings`, pct: `${occupancyPct}% occ.`, colorClass: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
                  { label: 'Registered Guests', value: users.length.toString(), icon: FiUsers, detail: `${hotels.length} hotels · ${rooms.length} rooms`, pct: `${availableRooms} avail.`, colorClass: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
                  { label: 'Room Occupancy', value: `${occupancyPct}%`, icon: FiTrendingUp, detail: `${occupiedRooms} occupied / ${rooms.length} total`, pct: `${availableRooms} free`, colorClass: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
                ].map((item) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    key={item.label}
                    className="rounded-3xl border border-white/5 bg-slate-950/60 p-5 flex items-center justify-between hover:border-white/10 hover:bg-slate-950/80 transition-all duration-300 group"
                  >
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-400">{item.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-semibold text-white">{item.value}</p>
                        <span className="text-[10px] font-semibold text-emerald-400">{item.pct}</span>
                      </div>
                      <p className="text-[10px] text-slate-500">{item.detail}</p>
                    </div>
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300 group-hover:scale-110 ${item.colorClass}`}>
                      <item.icon className="text-xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6 soft-card p-6 md:p-8 border border-white/5 hover:border-amber-500/10 hover:shadow-2xl hover:shadow-amber-500/5 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
                <p className="text-xs text-slate-400 mt-1">Live database query on customer bookings and statuses</p>
              </div>
              <span className="self-start sm:self-auto rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                {bookings.length} Total Bookings
              </span>
            </div>
            <BookingTable rows={bookings} />
          </section>
        </>
      )}

      {activeTab === 'hotels' && (
        <section className="space-y-6 soft-card p-6 md:p-8 border border-white/5">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Hotel Management</h2>
              <p className="text-xs text-slate-400 mt-1">Add, edit properties or append room configurations</p>
            </div>
            <button onClick={openAddHotel} className="primary-action px-4 py-2 text-xs">
              <FiPlus /> Add Hotel
            </button>
          </div>

          <div className="overflow-x-auto glass-table">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Hotel Name</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {hotels.map((h) => (
                  <tr key={h.id} className="hover:bg-white/5 transition duration-200">
                    <td className="p-4 text-slate-400">#{h.id}</td>
                    <td className="p-4">
                      {h.imageUrl ? (
                        <img
                          src={h.imageUrl}
                          alt={h.name}
                          className="h-10 w-16 rounded-lg object-cover border border-white/10"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-xs text-slate-600 italic">No image</span>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-white">{h.name}</td>
                    <td className="p-4 text-slate-300">{h.city}</td>
                    <td className="p-4 text-slate-400">{h.location || '—'}</td>
                    <td className="p-4">
                      <span className="rounded bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 text-xs text-amber-400 font-bold">
                        ★ {h.rating || '4.0'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openAddRoom(h)}
                        className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                      >
                        + Add Room
                      </button>
                      <button
                        onClick={() => openEditHotel(h)}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:text-white transition"
                        title="Edit Hotel"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteHotel(h.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-300 hover:text-rose-200 transition"
                        title="Delete Hotel"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {hotels.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">No hotels found in database. Create one to begin.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'rooms' && (
        <section className="space-y-6 soft-card p-6 md:p-8 border border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-4 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Room Inventory</h2>
              <p className="text-xs text-slate-400 mt-1">Audit, modify details, set availability, or add individual rooms</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={roomFilterHotelId}
                onChange={(e) => setRoomFilterHotelId(e.target.value)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 outline-none focus:border-amber-400/40"
              >
                <option value="all" className="bg-slate-950">All Hotels</option>
                {hotels.map(h => (
                  <option key={h.id} value={h.id.toString()} className="bg-slate-950">{h.name}</option>
                ))}
              </select>
              <button onClick={() => openAddRoom(null)} className="primary-action px-4 py-2 text-xs">
                <FiPlus /> Add Room
              </button>
            </div>
          </div>

          <div className="overflow-x-auto glass-table">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-4">Room ID</th>
                  <th className="p-4">Hotel Name</th>
                  <th className="p-4">Room Number</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4">Price Per Night</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredRooms.map((r) => (
                  <tr key={r.id} className="hover:bg-white/5 transition duration-200">
                    <td className="p-4 text-slate-400">#{r.id}</td>
                    <td className="p-4 font-semibold text-white">{r.hotel?.name || '—'}</td>
                    <td className="p-4 text-slate-300 font-medium">{r.number}</td>
                    <td className="p-4 text-slate-400">{r.capacity} Guests</td>
                    <td className="p-4 text-amber-400 font-semibold">₹{r.pricePerNight}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                        r.available
                          ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25'
                          : 'bg-rose-400/10 text-rose-400 border-rose-400/25'
                      }`}>
                        {r.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditRoom(r)}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:text-white transition"
                        title="Edit Room"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(r.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/20 bg-rose-500/10 p-1.5 text-rose-300 hover:text-rose-200 transition"
                        title="Delete Room"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredRooms.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">No rooms found in database. Create one to begin.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'bookings' && (
        <section className="space-y-6 soft-card p-6 md:p-8 border border-white/5">
          <div>
            <h2 className="text-xl font-semibold text-white">Reservations Log</h2>
            <p className="text-xs text-slate-400 mt-1">Audit guest bookings, modify statuses, or cancel transactions</p>
          </div>

          <div className="overflow-x-auto glass-table">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Guest Email</th>
                  <th className="p-4">Room Details</th>
                  <th className="p-4">Check In</th>
                  <th className="p-4">Check Out</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition duration-200">
                    <td className="p-4 font-semibold text-white">#BK-{b.id}</td>
                    <td className="p-4 text-slate-300">{b.user?.username || b.user?.email || '—'}</td>
                    <td className="p-4 text-slate-400">
                      Room {b.room?.number || '—'} ({b.room?.hotel?.name || '—'})
                    </td>
                    <td className="p-4 text-slate-300">{b.checkInDate || b.checkIn || '—'}</td>
                    <td className="p-4 text-slate-300">{b.checkOutDate || b.checkOut || '—'}</td>
                    <td className="p-4 text-amber-400 font-semibold">₹{b.totalAmount || b.amount || '0'}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                        b.status === 'CONFIRMED' || b.bookingStatus === 'CONFIRMED'
                          ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/25'
                          : b.status === 'CANCELLED' || b.bookingStatus === 'CANCELLED'
                          ? 'bg-rose-400/10 text-rose-400 border-rose-400/25'
                          : 'bg-amber-400/10 text-amber-400 border-amber-400/25'
                      }`}>
                        {b.status || b.bookingStatus || 'PENDING'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {(b.status !== 'CANCELLED' && b.bookingStatus !== 'CANCELLED') ? (
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                        >
                          Cancel Stay
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-slate-500">No active bookings found in the database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Hotel Modal */}
      {hotelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              {editingHotel ? 'Edit Hotel Properties' : 'Add New Property'}
            </h3>
            <form onSubmit={handleSaveHotel} className="space-y-4">
              <InputField
                label="Hotel Name"
                placeholder="Skyline Luxury Resort"
                value={hotelForm.name}
                onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                required
              />
              <InputField
                label="City"
                placeholder="Mumbai"
                value={hotelForm.city}
                onChange={(e) => setHotelForm({ ...hotelForm, city: e.target.value })}
                required
              />
              <InputField
                label="Location description"
                placeholder="Downtown Waterfront"
                value={hotelForm.location}
                onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })}
                required
              />
              <InputField
                label="Rating Star"
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="4.5"
                value={hotelForm.rating}
                onChange={(e) => setHotelForm({ ...hotelForm, rating: Number(e.target.value) })}
                required
              />
              <InputField
                label="Image URL"
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={hotelForm.imageUrl}
                onChange={(e) => setHotelForm({ ...hotelForm, imageUrl: e.target.value })}
              />
              {hotelForm.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={hotelForm.imageUrl}
                    alt="Preview"
                    className="h-36 w-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setHotelModalOpen(false)}
                  className="rounded-full px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition bg-white/5"
                >
                  Cancel
                </button>
                <button type="submit" className="primary-action px-6 py-2.5 text-xs font-bold">
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Room Modal */}
      {roomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-1">
              {editingRoom ? 'Edit Room Configuration' : 'Add Room Configuration'}
            </h3>
            {targetHotel && (
              <p className="text-xs text-slate-400 mb-6">Associated with {targetHotel.name}</p>
            )}
            {!targetHotel && (
              <p className="text-xs text-slate-400 mb-6">Select a hotel and room parameters</p>
            )}
            <form onSubmit={handleSaveRoom} className="space-y-4">
              {!targetHotel && !editingRoom && (
                <label className="block space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Hotel</span>
                  <select
                    value={roomForm.hotelId}
                    onChange={(e) => setRoomForm({ ...roomForm, hotelId: e.target.value })}
                    required
                    className="w-full rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-3 text-slate-200 outline-none text-sm focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/10"
                  >
                    <option value="" disabled className="bg-slate-950">Choose a hotel...</option>
                    {hotels.map((h) => (
                      <option key={h.id} value={h.id} className="bg-slate-950">
                        {h.name} ({h.city})
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {targetHotel && (
                <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Associated Hotel</span>
                  <p className="text-sm font-bold text-white mt-1">{targetHotel.name}</p>
                </div>
              )}

              <InputField
                label="Room Number/Name"
                placeholder="101"
                value={roomForm.number}
                onChange={(e) => setRoomForm({ ...roomForm, number: e.target.value })}
                required
              />
              <InputField
                label="Occupant Capacity"
                type="number"
                min="1"
                max="10"
                placeholder="2"
                value={roomForm.capacity}
                onChange={(e) => setRoomForm({ ...roomForm, capacity: Number(e.target.value) })}
                required
              />
              <InputField
                label="Price Per Night (₹)"
                type="number"
                min="0"
                placeholder="150"
                value={roomForm.pricePerNight}
                onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: Number(e.target.value) })}
                required
              />
              <label className="flex items-center gap-3 cursor-pointer select-none py-2">
                <input
                  type="checkbox"
                  checked={roomForm.available}
                  onChange={(e) => setRoomForm({ ...roomForm, available: e.target.checked })}
                  className="rounded border-white/5 bg-transparent text-amber-500 focus:ring-amber-500/20"
                />
                <span className="text-sm text-slate-200">Set room as Available immediately</span>
              </label>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setRoomModalOpen(false)}
                  className="rounded-full px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition bg-white/5"
                >
                  Cancel
                </button>
                <button type="submit" className="primary-action px-6 py-2.5 text-xs font-bold">
                  {editingRoom ? 'Save Changes' : 'Create Room'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </PageWrapper>
  );
}