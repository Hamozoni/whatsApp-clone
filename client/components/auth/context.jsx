"use client"
import { firebase_auth } from "@/lib/firebase_config";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import axios from "axios";

export const Auth_context = createContext();


export const  Auth_context_provider =  ({children})=> {

    const [user,set_user] = useState(null);
    const [is_loading,set_is_loading] = useState(true);
    const [contacts,set_contacts] = useState(null);
    const [chats,set_chats] = useState(null);
    
    useEffect(() => {

      set_is_loading(true);
        const initializeAuth = async () => {

          // Set explicit persistence
          await setPersistence(firebase_auth, browserLocalPersistence);
          const unsubscribe = firebase_auth.onAuthStateChanged(async user => {
            set_user(user);
            console.log(user?.email)
            try {
              const{ data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chats_contacts`,{email:user?.email})
              set_chats(data?.chats);
              // set_contacts(data?.contacts)
              set_is_loading(false);
              console.log(data)

            }
            catch {
              set_is_loading(false);
            }
          });
    
          return unsubscribe;
        };
    
        initializeAuth();
      }, []);

    return (
        <Auth_context.Provider value={{user,is_loading,contacts,chats}}>
            {children}
        </Auth_context.Provider>
    )
};



