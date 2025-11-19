import axios from "axios";
import auth from "./firebaseConfig";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000
});



api.interceptors.request.use(async (config)=> {
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
            location.href = '/auth/signin'
        }


        return config;

    }
);


export default api;

