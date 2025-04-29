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
    const [camera_facing_mode,set_camera_facing_mode] = useState(false);

    const local_video = useRef(null);
    const remote_video = useRef(null);
    const peer_connection = useRef(null);

    const get_user_media = async ()=> {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: camera_facing_mode  ? 'environment' : "user"  ,aspectRatio: 9/16 },
            audio: true
        });
       return stream
    };


    useEffect(()=> {
        socket?.on('coming_call',({from})=> {
            set_caller(from);
            set_call_status('ringing')
        });
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
                camera_facing_mode,
                set_camera_facing_mode,
                local_video,
                remote_video,
                peer_connection,
                get_user_media

            }} 
           >
            {children}
            {
                call_status !== 'idle' && <Call />
            }
        </Call_context.Provider>
    )
}

