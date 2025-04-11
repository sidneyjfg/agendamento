import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = backendUrl;
console.log("URL BACKEND: ",API_URL);
const api = axios.create({
    baseURL: API_URL, // Substitua pela URL do seu backend
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;