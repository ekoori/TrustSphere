// File: ./frontend/src/api.js
// Description: API configuration and interceptors
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.236.35.144:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    config => {
        // Get session ID from cookie
        const cookies = document.cookie.split(';');
        const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session_id='));
        if (sessionCookie) {
            const sessionId = sessionCookie.split('=')[1];
            config.headers['session_id'] = sessionId;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Request interceptor for handling cookies
api.interceptors.request.use(
    config => {
        const cookies = document.cookie.split(';');
        const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session_id='));
        if (sessionCookie) {
            const sessionId = sessionCookie.split('=')[1];
            config.headers['session_id'] = sessionId;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Clear local storage
            localStorage.removeItem('isLoggedIn');
            
            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;