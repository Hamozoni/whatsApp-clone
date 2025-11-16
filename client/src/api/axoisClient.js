import axios from "axios";
import {getAuth} from "firebase/auth";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000
});



api.interceptors.request.use(
    async (config)=> {
        const auth = getAuth();
        const user = auth.currentUser;

        if(user){
            const toket = await user.getIdToken();
            config.headers.Authorization = `Bearer ${toket}`
        };


        return config;

    },
    (error)=> Promise.reject(error)
);


export default api;

