import axios from './axiosInstance';

const userApi = {
  getAllUsers: () => axios.get('/users').then((r) => r.data),
  getUserById: (id) => axios.get(`/users/${id}`).then((r) => r.data),
  updateUser: (id, payload) => axios.put(`/users/${id}`, payload).then((r) => r.data),
  deleteUser: (id) => axios.delete(`/users/${id}`).then((r) => r.data),
};

export default userApi;
