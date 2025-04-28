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
    const [peer_connection,set_peer_connection] = useState(null);

    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);

    useEffect(()=> {
        socket?.on('coming_call',({from})=> {
            set_caller(from);
            set_call_status('ringing')
        });

        socket?.on('call_end',()=> {
            set_call_status('idle');
        });

        socket?.on('call_connected',()=> {
            set_call_status('connected');
        })

        return ()=> {
            socket?.off('coming_call')
            socket?.off('call_end');
            socket?.off('call_connected');
        }
    },[socket]);


    return (
        <Call_context.Provider
            value={{
                callee,
                set_callee,
                caller,
                set_caller,
                call_status,
                set_call_status,
                local_video_ref,
                remote_video_ref,
                peer_connection,
                set_peer_connection
            }} 
           >
            {children}
            {
                call_status !== 'idle' && <Call />
            }
        </Call_context.Provider>
    )
}

