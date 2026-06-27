import { create } from 'zustand';
import { authAPI, userAPI } from '../services/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await authAPI.register(data);
      const { _id, name, email, token } = res.data.data;
      const user = { _id, name, email };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token, loading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await authAPI.login(data);
      const { _id, name, email, token } = res.data.data;
      const user = { _id, name, email };
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token, loading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  updateUser: (userData) => {
    const user = { ...useAuthStore.getState().user, ...userData };
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  fetchProfile: async () => {
    try {
      const res = await userAPI.getProfile();
      const user = res.data.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
      return user;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => !!useAuthStore.getState().token,
}));

export default useAuthStore;
