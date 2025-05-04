"use client"
import { firebase_auth } from "@/lib/firebase_config";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Loading_component } from "../components/ui/loading_component";
import { useRouter } from "next/navigation";
import { fetch_data } from "@/lib/fetch_data";
import { io } from "socket.io-client";

export const User_context = createContext();


export const  User_context_provider =  ({children})=> {
  
    const [user,set_user] = useState(null);
    const [loading,set_loading] = useState(true);
    const [error,set_error] = useState(false);
    const [contacts,set_contacts] = useState([]);
    const [chats,set_chats] = useState([]);
    const [socket,set_socket] = useState(null);
    const [active_navbar,set_active_navbar] = useState('chats');

    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
          set_loading(true);
          set_error(null);

          try{
            await setPersistence(firebase_auth, browserLocalPersistence);
  
            firebase_auth.onAuthStateChanged(async user => {
              if(!user) {
                router.push('/signin')
                return;
              }
  
               const data = await fetch_data(`user?user_email=${user?.email}`);
                 set_user(data?.user);
                 set_chats(data?.chats);
                 set_contacts(data?.user?.contacts);
  
               const socket = await io.connect(process.env.NEXT_PUBLIC_SOCKET_URL,{
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
            set_error(error.message);
          }
          finally {
            set_loading(false)
          }

        };
    
        initializeAuth();
        return ()=> socket?.disconnect()
      }, [firebase_auth]);

    
    if(loading) {
      return (
        <Loading_component />
      )
    }

    return (
        <User_context.Provider 
            value={
              {
                user,
                socket,
                contacts,
                set_contacts,
                loading,
                chats,
                set_chats,
                active_navbar,
                set_active_navbar
              }
            }>
            {children}
        </User_context.Provider>
    )
};



