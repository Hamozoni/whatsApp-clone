import axios from "axios";
import {getAuth} from "firebase/auth";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000
});


let isRefreshing = false;
let faildQueue = [];


const processQueue = (error,token = null)=> {
    faildQueue.forEach(prom => {
        if(error){
            prom.reject(error)
        }else {
            prom.reject(token)
        }
    });

    faildQueue = []
};


api.interceptors.request.use(async (config)=> {

    const auth = getAuth();
    const user = auth.currentUser;

    if(user){
        const toket = await user.getIdToken();

        config.headers.Authorization
    }
})

