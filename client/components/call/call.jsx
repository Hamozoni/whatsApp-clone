"use client";

import { Call_context } from "@/contexts/call.context";
import { useContext, useEffect } from "react";
import { Outgoing_call } from "./outgoing_call";
import { Ringing_call } from "./ringing_call";
import { Connected_call } from "./connected_call";
import { User_context } from "@/contexts/user.context";

export const Call = ()=> {

    const {
        call_status,
        local_video,
        peer_connection,
        set_call_status,
        get_user_media
    } = useContext(Call_context);

    const {socket} = useContext(User_context);

    const clean_up = ()=>{
        if(local_video.current) {
            local_video.current.srcObject.getTracks()?.forEach(track=> track.stop());
        }
    
        if(peer_connection.current) {
            peer_connection?.current?.close();
            peer_connection.current = null
        };
        set_call_status('idle');
    };

    const start_call = async()=> {
        const stream = await get_user_media()
            local_video.current.srcObject = stream
    }

    useEffect(()=> {
        start_call()
        socket?.on('call_end',()=> {
            clean_up()
        });
        socket?.on('call_connected',()=> {
            set_call_status('connected');
        });

        return ()=> clean_up()
    },[socket]);

    return (
        <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-30 bg-gray-900">
            {
                call_status === 'call' ? 
                <Outgoing_call /> :
                call_status === 'ringing'  ? 
                <Ringing_call /> :
                call_status === 'connected'  && 
                <Connected_call />
            }
        </div>
    );
};
