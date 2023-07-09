// api.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://143.42.34.42:5000'
});

export default instance;
