"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User_context } from "./user.context";
import update_message_status from "@/utils/update_mesages_status";
 

export const Chat_window_context = createContext(null);

export const Chat_window_context_provider = ({children})=> {

    const {user,socket} = useContext(User_context);
    const [active_chat,set_active_chat] = useState(null);
    const [is_document,set_is_document] = useState(false);
    const [messages, set_messages] = useState([]);
    const [message,set_message] = useState({})

  

    useEffect(() => {

    if(!active_chat) return;

      set_messages([]);

      if(!active_chat?._id) return;
        update_message_status(socket,active_chat?._id,receiver?._id,'READ');

    },[active_chat]);
    


    return (
        <Chat_window_context.Provider
            value={
                {
                    is_document,
                    set_is_document,
                    messages,
                    set_messages,
                    message,
                    set_message,
                    active_chat,
                    set_active_chat
                }
                }
        >
            {children}
        </Chat_window_context.Provider>
    )
}