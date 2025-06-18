// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://2211-41-232-91-48.ngrok-free.app/api', // ✨ عدلي الـ baseURL لو اتغير
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✨ توكن بيتضاف تلقائيًا قبل كل طلب
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
