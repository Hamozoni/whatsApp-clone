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
        set_call_status,
    } = useContext(Call_context);

    const {socket} = useContext(User_context);


    useEffect(()=> {
        socket?.on('call_connected',()=> {
            set_call_status('connected');
        });

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
