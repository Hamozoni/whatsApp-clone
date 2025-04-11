"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User_context } from "./user.context";
 

export const Chat_window_context = createContext(null);

export const Chat_window_context_provider = ({children})=> {

    const {user,socket} = useContext(User_context);
    const [active_chat,set_active_chat] = useState(null);
    const [is_document,set_is_document] = useState(false);
    const [messages, set_messages] = useState([]);
    const [message,set_message] = useState({})

  

    useEffect(() => {
        set_messages([]);
        set_message({
          chat_id: active_chat?._id ?  active_chat?._id : null,
          sender: user?._id,
          contact: active_chat?.contact?._id,
          text:'',
          type:'TEXT',
          status: 'SENT'
    
        });

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