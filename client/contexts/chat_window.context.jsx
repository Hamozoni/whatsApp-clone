"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User_context } from "./user.context";
import update_message_status from "@/utils/update_mesages_status";
import { io } from "socket.io-client";

 

export const Chat_window_context = createContext(null);

export const Chat_window_context_provider = ({children})=> {

    const socket = useRef(null)
    const {user,active_chat} = useContext(User_context);
    const [is_document,set_is_document] = useState(false);
    const [messages, set_messages] = useState([]);
    const [receiver, set_receiver] = useState(null);

  

    useEffect(() => {

    if(!active_chat) return

      set_messages([]);
      const receiver = active_chat.members.filter(e=> e._id !== user?._id)[0]
      set_receiver(receiver);

      if(!active_chat?._id) return
        update_message_status(socket,active_chat?._id,receiver?._id,'READ');

    },[active_chat]);

    useEffect(()=> {
        socket.current = io.connect('http://localhost:4400',{
            reconnection: true,
            reconnectionAttempts: 5,
            transports: ['websocket'],
            query : {
                user_id: user?._id
            }
        });

        return ()=> socket.current.disconnect()
    },[user]);
    


    return (
        <Chat_window_context.Provider
            value={
                {
                    socket: socket.current,
                    is_document,
                    set_is_document,
                    messages,
                    set_messages,
                    receiver,
                    set_receiver
                }
                }
        >
            {children}
        </Chat_window_context.Provider>
    )
}