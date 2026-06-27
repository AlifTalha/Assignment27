import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const newsAPI = {
  getAll: (params) => API.get('/news', { params }),
  getTop: () => API.get('/news/top'),
  getLatest: () => API.get('/news/latest'),
  getByCategory: (category) => API.get(`/news/category/${category}`),
  getById: (id) => API.get(`/news/${id}`),
  create: (data) => API.post('/news', data),
  update: (id, data) => API.put(`/news/${id}`, data),
  delete: (id) => API.delete(`/news/${id}`),
};

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
  getMyNews: () => API.get('/users/my-news'),
};

export const contactAPI = {
  send: (data) => API.post('/contact', data),
};

export default API;
