"use client"
import { firebase_auth } from "@/lib/firebase_config";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';

export const Auth_context = createContext();


export const  Auth_context_provider =  ({children})=> {

    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const initializeAuth = async () => {

          // Set explicit persistence
          await setPersistence(firebase_auth, browserLocalPersistence);
          const unsubscribe = firebase_auth.onAuthStateChanged(user => {
            setUser(user);
            setIsLoading(false);
          });
    
          return unsubscribe;
        };
    
        initializeAuth();
      }, []);

      console.log(user)

    return (
        <Auth_context.Provider value={{user,isLoading}}>
            {children}
        </Auth_context.Provider>
    )
};



