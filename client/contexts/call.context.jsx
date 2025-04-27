"use client";

import { Video_call } from "@/components/call/outgoing_call";
import { createContext, useContext, useState } from "react";
import { Chat_window_context } from "./chat_window.context";


export const Call_context = createContext(null);


export const Call_context_provider = ({children})=> {

    const {active_chat} = useContext(Chat_window_context);

    const [call_status,set_call_status] = useState('idle')


    return (
        <Call_context.Provider
            value={{
                is_call,
                set_is_call
            }} 
           >
            {children}
        </Call_context.Provider>
    )
}

