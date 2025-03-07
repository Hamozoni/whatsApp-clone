"use client"
import { firebase_auth } from "@/lib/firebase_config";
import { createContext, useEffect, useState } from "react";

export const Auth_context = createContext();


export const  Auth_context_provider =  ({children})=> {

    const [user,setUser] = useState(null);

    useEffect(()=> {
        setUser(firebase_auth.currentUser)
        firebase_auth.onAuthStateChanged((user)=> {
            setUser(user);
            })
    },[]);

    return (
        <Auth_context.Provider value={{user}}>
            {children}
        </Auth_context.Provider>
    )
};



