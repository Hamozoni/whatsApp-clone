import { firebase_auth } from "../lib/firebase_config";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Loading_component } from "../components/ui/loading_component";
import { fetch_data } from "../lib/fetch_data";
import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";

export const User_context = createContext();


export const  User_context_provider =  ({children})=> {
  
    const [user,set_user] = useState(null);
    const [loading,set_loading] = useState(true);
    const [error,set_error] = useState(false);
    const [contacts,set_contacts] = useState([]);
    const [chats,set_chats] = useState([]);
    const [status,set_status] =  useState([]);
    const [calls,set_calls] = useState([]);
    const [socket,set_socket] = useState(null);
    const [active_navbar,set_active_navbar] = useState('chats');

    // const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
          set_loading(true);
          set_error(null);

          try{
            await setPersistence(firebase_auth, browserLocalPersistence);
  
            firebase_auth.onAuthStateChanged(async user => {
               const data = await fetch_data(`user?user_email=${user?.email}`);
               const {statuses} = await fetch_data(`status?user_id=${data?.user?._id}`);
                  const st = Object.values(Object.groupBy(statuses,status=> status.user._id));
                 set_status(st)
                 set_user(data?.user);
                 set_calls(data?.user?.calls)
                 set_chats(data?.chats);
                 set_contacts(data?.user?.contacts);
  
               const socket = await io.connect(import.meta.env.VITE_SOCKET_URL,{
                  reconnection: true,
                  reconnectionAttempts: 5,
                  transports: ['websocket'],
                  query : {
                      user_id: data?.user?._id
                  }
              });
  
              set_socket(socket);
  
            });

          }
          catch (error){
            console.log(error)
            set_error(error.message);
          }
          finally {
            set_loading(false);
          }

        };
    
        initializeAuth();
        return ()=> socket?.disconnect()
      }, [firebase_auth]);

    
    if(loading) {
      return (
        <Loading_component />
      )
    }else {
      return (
          <User_context.Provider 
              value={
                {
                  user,
                  set_user,
                  socket,
                  contacts,
                  set_contacts,
                  loading,
                  chats,
                  set_chats,
                  active_navbar,
                  set_active_navbar,
                  calls,
                  set_calls,
                  status,
                  set_status
                }
              }>
              {children}
          </User_context.Provider>
      )

    }

};



