import axios from "axios";
import Constants from "expo-constants";

const uri = Constants.expoConfig?.hostUri ? `http://${Constants.expoConfig?.hostUri?.split(':').shift()}:3000` : "";
const api = axios.create({
    baseURL: "https://breadwithegg.onrender.com",    timeout: 10000,// Tempo limite de 5 segundos
    //baseURL: uri, // Use o URI configurado no Expo
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
    // Só loga se não for 404 (útil para checagem de e-mail)
    if (!(error.response && error.response.status === 404)) {
      console.error('Erro de API:', error);
    }
    return Promise.reject(error);
  }
);

export default api;
