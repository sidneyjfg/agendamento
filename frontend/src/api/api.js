import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL, // Substitua pela URL do seu backend
    headers: {
        'Content-Type': 'application/json',
    },
});


export const setToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


export default api;