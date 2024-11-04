import axios from "axios";
import Constants from "expo-constants";

const uri = Constants.expoConfig?.hostUri ? `http://${Constants.expoConfig?.hostUri?.split(':').shift()}:3000` : "";
const api = axios.create({
    baseURL: uri,
    timeout: 5000, // Tempo limite de 5 segundos
    headers: {
        'Content-Type': 'application/json',
    }
})

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
