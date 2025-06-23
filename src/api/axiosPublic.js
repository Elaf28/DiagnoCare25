// import axios from 'axios';

// const axiosPublic = axios.create({
//     baseURL: 'http://dcare.runasp.net/api',
// });

// export default axiosPublic;




// src/api/axiosPublic.js
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: '/api', // ✅ بدل http://dcare.runasp.net/api
});

export default axiosPublic;
