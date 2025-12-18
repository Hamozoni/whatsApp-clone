import axios from "axios";
import auth from "./firebaseConfig";


const api = axios.create({
    baseURL:'http://localhost:4400/api',
    timeout: 5 * 60 * 1000
})



api.interceptors.request.use(
    async config => {
        const user = auth.currentUser;
        if(user){
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }else {
            window.location.href = '/auth/signin'
        }
        return config;
    },
    error => {
        return new Promise.reject(error)
    }
);

api.interceptors.response.use(response => response,
    async error => {
        console.log(error);

        if(error.status?.response === 401) {
            const user = auth.currentUser;

            if(user){
                try{
                    const newToken = await user.getIdToken(true);
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    return api.request(error.request)
                }
                catch {
                    await auth.signOut();
                    window.location.href = '/auth/signin'
                }
            }else {
                window.location.href = '/auth/signin'
            }
        }

        return new Promise.reject(error)
    }
)




export default api;

