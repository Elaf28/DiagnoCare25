// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://dcare.runasp.net/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// لو فيه token حابة تضيفيه تلقائيًا في كل طلب
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
