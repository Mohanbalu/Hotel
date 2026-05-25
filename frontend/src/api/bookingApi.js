import axios from './axiosInstance';

const bookingApi = {
  createBooking: (payload) => axios.post('/bookings', payload).then((r) => r.data),
  cancelBooking: (id) => axios.post(`/bookings/${id}/cancel`).then((r) => r.data),
  getBookingById: (id) => axios.get(`/bookings/${id}`).then((r) => r.data),
  getUserBookings: (userId) => axios.get('/bookings', { params: { userId } }).then((r) => r.data),
  // Admin convenience
  getAllBookings: () => axios.get('/bookings/all').then((r) => r.data),
};

export default bookingApi;
