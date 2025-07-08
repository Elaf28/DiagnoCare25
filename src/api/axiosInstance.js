// // src/api/axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://dcare.runasp.net/api', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default axiosInstance;










// // src/api/axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: '/api', // ✅ بدل http://dcare.runasp.net/api
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // لو فيه token حابة تضيفيه تلقائيًا في كل طلب
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default axiosInstance;






// const isProduction = window.location.protocol === 'https:';

// const axiosInstance = axios.create({
//   baseURL: isProduction
//     ? 'https://dcare.runasp.net/api'
//     : 'http://dcare.runasp.net/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });





// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // ⬅️ كده هيشتغل على local و vercel
  headers: {
    'Content-Type': 'application/json',
  },
});

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
