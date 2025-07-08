// import axios from 'axios';

// const axiosPublic = axios.create({
//     baseURL: 'http://dcare.runasp.net/api',
// });

// export default axiosPublic;







// // src/api/axiosPublic.js
// import axios from 'axios';

// const axiosPublic = axios.create({
//   baseURL: '/api', // ✅ بدل http://dcare.runasp.net/api
// });

// export default axiosPublic;








// const isProduction = window.location.protocol === 'https:';

// const axiosPublic = axios.create({
//   baseURL: isProduction
//     ? 'https://dcare.runasp.net/api'
//     : 'http://dcare.runasp.net/api',
// });






// src/api/axiosPublic.js
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: '/api', // ✅ كده هيشتغل على local باستخدام proxy و على Vercel مباشرة
});

export default axiosPublic;
