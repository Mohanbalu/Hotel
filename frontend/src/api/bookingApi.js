import axios from './axiosInstance';

const bookingApi = {
  createBooking: (payload) => axios.post('/bookings', null, {
    params: {
      userId: payload.userId,
      roomId: payload.roomId,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut
    }
  }).then((r) => r.data),
  cancelBooking: (id) => axios.put(`/bookings/cancel/${id}`).then((r) => r.data),
  getBookingById: (id) => axios.get(`/bookings/${id}`).then((r) => r.data),
  getUserBookings: (userId) => axios.get(`/bookings/user/${userId}`).then((r) => r.data),
  // Admin convenience
  getAllBookings: () => axios.get('/bookings').then((r) => r.data),
};

export default bookingApi;
