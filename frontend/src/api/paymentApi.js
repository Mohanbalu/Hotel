import axios from './axiosInstance';

const paymentApi = {
  createPayment: (payload) => axios.post('/payments', payload).then((r) => r.data),
  updatePaymentStatus: (id, payload) => axios.put(`/payments/${id}`, payload).then((r) => r.data),
  getPaymentByBooking: (bookingId) => axios.get(`/payments`, { params: { bookingId } }).then((r) => r.data),
};

export default paymentApi;
