"use client"
import { Chat_window_context } from "@/contexts/chat_window.context";
import { User_context } from "@/contexts/user.context";
import { handle_send_message } from "@/lib/handle_send_message";
import { useContext, useEffect } from "react";
import { LuSendHorizontal } from "react-icons/lu"


export const Send_message_btn = ({set_loading,set_error,error
})=> {


    const {message,set_active_chat,text,set_text,set_message} = useContext(Chat_window_context);
    const {socket,set_chats} = useContext(User_context);


    useEffect(()=> {
        set_message(prev=> ({...prev,text}))
    },[text]);

    return (
        <button
            onClick={()=>{
                handle_send_message({
                    message,
                    set_loading,
                    set_error,
                    set_chats,
                    active_chat,
                    set_active_chat,
                    socket
                });
                if(!error) {
                    set_text('');
                }

            }}
            className="px-2 py-3 rounded-md text-white transition-colors hide_model"
            >
            <LuSendHorizontal className="h-6 w-6 text-[#f7f8fa] cursor-pointer " />
        </button>
    )
}