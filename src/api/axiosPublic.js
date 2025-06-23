import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'http://dcare.runasp.net/api',
});

export default axiosPublic;
