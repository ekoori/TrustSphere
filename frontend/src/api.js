// File: ./frontend/src/api.js
// Description: This file sets up the Axios instance for making HTTP requests to the backend API with default configurations.
// Classes/Methods/Properties: 
//    [+] api - Axios instance configured with the base URL and credentials support for making API requests.

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://143.42.34.42:5000',
    withCredentials: true 
});

export default api;
