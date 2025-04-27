"use client";

import { Call } from "@/components/call/call";
import { createContext, useRef, useState } from "react";


export const Call_context = createContext(null);


export const Call_context_provider = ({children})=> {

    const [call_status,set_call_status] = useState('idle');
    const [callee,set_callee] = useState(null);
    const [caller,set_caller] = useState(null);
    const [peer_connection,set_peer_connection] = useState(null);

    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);


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

