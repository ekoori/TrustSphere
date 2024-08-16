// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://143.42.34.42:5000'
});

export default api;
