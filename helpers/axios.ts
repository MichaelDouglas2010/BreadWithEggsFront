import axios from "axios";
import Constants from "expo-constants";

const uri = Constants.expoConfig?.hostUri ? `http://${Constants.expoConfig?.hostUri?.split(':').shift()}:3000` : "";
const api = axios.create({
    baseURL: uri,
    timeout: 2000

})

export default api