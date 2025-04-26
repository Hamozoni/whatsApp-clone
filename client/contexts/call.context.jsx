"use client";

import { Video_call } from "@/components/call/video_call";
import { createContext, useContext, useState } from "react";
import { Chat_window_context } from "./chat_window.context";


export const Call_context = createContext(null);


export const Call_context_provider = ({children})=> {
    const {active_chat} = useContext(Chat_window_context)

        const [is_call,set_is_call] = useState(false);
    return (
        <Call_context.Provider
            value={{
                is_call,
                set_is_call
            }} 
           >
            {children}
            {
                is_call && (
                <Video_call to={active_chat?.contact?._id} />
                )
            }
        </Call_context.Provider>
    )
}

