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

api.interceptors.response.use(
    (response)=> response,
    async (error)=> {

        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){
            if(isRefreshing){
                return new Promise((resolve,reject)=> {
                    faildQueue.push({resolve,reject});
                }).then( token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest)
                }).catch( (err) => Promise.reject(err));
            };

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve,reject)=> {
                const auth = getAuth();
                const user = auth.currentUser;

                if(user) {
                    user.getIdToken(true)
                    .then(token=> {
                        api.defaults.headers.common['Authorization'] = `Brearer ${token}`;
                        originalRequest.headers.Authorization = `Brearer ${token}`;
                        processQueue(null,token);
                        resolve(api(originalRequest))
                    })
                    .catch( err =>{
                        processQueue(err,null);
                        reject(err)
                        
                    })
                    .finally(()=>{
                        isRefreshing = false
                    })

                }else {
                    reject(error)
                }
            })
        }

        return Promise.reject(error)
    }

)

export default api;

