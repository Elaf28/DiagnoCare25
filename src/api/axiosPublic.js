import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: '/api', 
});

export default axiosPublic;
