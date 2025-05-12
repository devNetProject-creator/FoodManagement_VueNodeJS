import axios from 'axios';

const API_URL = 'http://localhost:5555';

export const authService = {
  signup: (userData) => axios.post(`${API_URL}/signup`, userData),
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  logout: () => axios.post(`${API_URL}/logout`)
};

export const foodService = {
  getFoodItems: () => axios.get(`${API_URL}/fooditems`),
  getFoodItemById: (id) => axios.get(`${API_URL}/fooditem/${id}`)
};

export const orderService = {
  getOrders: () => axios.get(`${API_URL}/orders`),
  getOrderById: (id) => axios.get(`${API_URL}/orders/${id}`),
  createOrder: (orderData) => axios.post(`${API_URL}/createorder`, orderData)
};
