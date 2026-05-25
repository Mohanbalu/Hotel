import axios from './axiosInstance';

const hotelApi = {
  getAllHotels: (params) => axios.get('/hotels', { params }).then((r) => r.data),
  getHotelById: (id) => axios.get(`/hotels/${id}`).then((r) => r.data),
  searchHotels: (query) => axios.get('/hotels/search', { params: query }).then((r) => r.data),
  addHotel: (payload) => axios.post('/hotels', payload).then((r) => r.data),
  updateHotel: (id, payload) => axios.put(`/hotels/${id}`, payload).then((r) => r.data),
  deleteHotel: (id) => axios.delete(`/hotels/${id}`).then((r) => r.data),
};

export default hotelApi;
