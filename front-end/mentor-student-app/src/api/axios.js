import axios from 'axios';

// Base URL for API requests from environment variables
const api = axios.create({
    baseURL: 'https://session-38.onrender.com/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
