import axios from "axios";
import { getAuth } from "firebase/auth";
import auth from "./firebaseConfig";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000
});



api.interceptors.request.use(async (config)=> {

    
    const Auth =  getAuth(auth);
    const user = Auth.currentUser;
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

api.interceptors.response.use(
    response => response,
    async (error)=> {
        if(error.response?.status == 401){
            const Auth =  getAuth(auth);
            const user = Auth.currentUser;
            if(user){
                try {
                    const newToken = await user.getIdToken(true);
                    error.config.headers.Authorization = `Bearer ${newToken}`
                    return api.request(error.config)
                }
                catch {
                    await Auth.signOut()
                    location.href = '/auth/signin'
                }
            }
        };

        return Promise.reject(error);
    }
);


export default api;

