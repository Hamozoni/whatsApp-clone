"use client"
import { firebase_auth } from "@/lib/firebase_config";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import axios from "axios";
import { Loading_component } from "./loading_component";
import { useRouter } from "next/navigation";

export const User_context = createContext();


export const  User_context_provider =  ({children})=> {

    const [user,set_user] = useState(null);
    const [user_auth,set_user_auth] = useState(null);
    const [is_loading,set_is_loading] = useState(true);
    const [active_chat,set_active_chat] = useState(null);

    const router = useRouter();
    
    useEffect(() => {

      set_is_loading(true);
        const initializeAuth = async () => {

          // Set explicit persistence
          await setPersistence(firebase_auth, browserLocalPersistence);
          const unsubscribe = firebase_auth.onAuthStateChanged(async user => {
            console.log(user);
            set_user_auth(user)
            try {
              const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`,{
                params : {user_id: user?.uid }
              })
              set_user(data?.user);
              set_is_loading(false);
              console.log(data);

            }
            catch(error) {
              console.log(error?.message)
              set_is_loading(false);
            }
          });
    
          return unsubscribe;
        };
    
        initializeAuth();
      }, []);

      useEffect(()=> {
        if(!user_auth && !is_loading) {
          router.push('/signin');
        }
      },[user_auth,is_loading]);
    
      if(is_loading) {
        return (
          <Loading_component />
        )
      }

    return (
        <User_context.Provider 
            value={
              {
                user_auth,
                user,
                is_loading,
                set_active_chat,
                active_chat
              }
            }>
            {children}
        </User_context.Provider>
    )
};



