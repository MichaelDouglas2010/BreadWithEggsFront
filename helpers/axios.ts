import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://192.168.210.39:3000',
    timeout: 5000, // Tempo limite de 5 segundos
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor de requisição
api.interceptors.request.use(
    (config) => {
        // Adicione cabeçalhos ou faça outras configurações aqui
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de resposta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erro de API:', error);
        return Promise.reject(error);
    }
);

export default api;
