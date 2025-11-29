import {io} from "socket.io-client";
import { getAuth } from "firebase/auth";

class socketClient {

    constructor() {
        this.socket = null
    }

    connect () {
        const auth = getAuth();
        const user =  auth.currentUser;

        if(user && !this.socket) {
            this.socket = io(import.meta.env.VITE_SOCKET_URL,{
                auth :{
                    token : user.uid
                }
            })
        }
        return this.socket;
    };

    disconnect () {
        if(this.socket){ 
             this.socket.disconnect();
             this.socket = null;
        }
    };

    getSocket  () {
        return this.socket;
    }


 };


 export default new socketClient()