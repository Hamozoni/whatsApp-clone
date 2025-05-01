"use client";

import { Call } from "@/components/call/call";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User_context } from "./user.context";


export const Call_context = createContext(null);


export const Call_context_provider = ({children})=> {

    const {socket} = useContext(User_context);

    const [call_status,set_call_status] = useState('idle');
    const [callee,set_callee] = useState(null);
    const [caller,set_caller] = useState(null);

    useEffect(()=> {
        socket?.on('call',({from})=> {
            set_caller(from);
            set_call_status('ringing')
        });

        return ()=> socket?.off('call');
    },[]);


    return (
        <Call_context.Provider
            value={{
                callee,
                set_callee,
                caller,
                set_caller,
                call_status,
                set_call_status,
            }} 
           >
            {children}
            {
                call_status !== 'idle' && <Call />
            }
        </Call_context.Provider>
    )
}

