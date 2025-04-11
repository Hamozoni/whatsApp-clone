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
    const [loading,set_loading] = useState(false);
    const [error,set_error] = useState(false);
    const [contacts,set_contacts] = useState([]);
    const [chats,set_chats] = useState([]);
    const [socket,set_socket] = useState(null)

    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {

          await setPersistence(firebase_auth, browserLocalPersistence);
          firebase_auth.onAuthStateChanged(async user => {
            if(!user) {
              router.push('/signin')
              return;
            }

             const data = await fetch_data(`user?user_email=${user?.email}`,set_loading,set_error);
             console.log(data)
             if(data){
               set_user(data?.user);
               set_chats(data?.chats);
               set_contacts(data?.user?.contacts);
             };

            const socket = await io.connect('http://localhost:4400',{
              reconnection: true,
              reconnectionAttempts: 5,
              transports: ['websocket'],
              query : {
                  user_id: data?.user?._id
              }
          });

          set_socket(socket)
          });
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
                set_chats
              }
            }>
            {children}
        </User_context.Provider>
    )
};



