"use client"

import { Chat_window_context } from "@/contexts/chat_window.context"
import { User_context } from "@/contexts/user.context";
import { useContext, useEffect } from "react"

export const Socket = ()=> {

    const {active_chat,set_active_chat} = useContext(Chat_window_context);
    const {socket,user,chats} = useContext(User_context);


    useEffect(()=>  {

        
    },[socket]);


    return (
        <div className="">
            <audio src="./new_message_sound.mp3" className=" hidden"></audio>
        </div>
    )
}