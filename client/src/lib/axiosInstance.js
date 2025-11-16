import axios from "axios";
import {getAuth} from "firebase/auth";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000
});



api.interceptors.request.use(async (config)=> {
        const auth = getAuth();
        const user = auth.currentUser;

        if(user){
            try {
                const toket = await user.getIdToken();
                config.headers.Authorization = `Bearer ${toket}`
            }
            catch (error){
                console.error('Error getting token:', error)
            }
        }else {
            location.href = '/auht/signin'
        }


        return config;

    }
);


export default api;

