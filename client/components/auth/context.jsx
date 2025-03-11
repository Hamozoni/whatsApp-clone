"use client"
import { firebase_auth } from "@/lib/firebase_config";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';

export const Auth_context = createContext();


export const  Auth_context_provider =  ({children})=> {

    const [user,set_user] = useState(null);
    const [is_loading,set_is_loading] = useState(true);
    
    useEffect(() => {

      set_is_loading(true);
        const initializeAuth = async () => {

          // Set explicit persistence
          await setPersistence(firebase_auth, browserLocalPersistence);
          const unsubscribe = firebase_auth.onAuthStateChanged(user => {
            set_user(user);
            set_is_loading(false);
          });
    
          return unsubscribe;
        };
    
        initializeAuth();
      }, []);

    return (
        <Auth_context.Provider value={{user,is_loading}}>
            {children}
        </Auth_context.Provider>
    )
};



