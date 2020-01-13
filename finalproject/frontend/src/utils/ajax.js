import axios from 'axios';

const apiEndpoint = 'http://localhost:4001';

const ajax = axios.create({
    baseURL: apiEndpoint,
    withCredentials: true,
});

export default ajax;