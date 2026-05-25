import axios from './axiosInstance';

const authApi = {
  login: (credentials) => axios.post('/auth/login', credentials).then((r) => r.data),
  register: (payload) => axios.post('/auth/register', payload).then((r) => r.data),
  // logout is handled on client side by token utils + context
};

export default authApi;
