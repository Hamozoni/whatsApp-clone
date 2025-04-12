"use client"

import { Chat_window_context } from "@/contexts/chat_window.context"
import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState } from "react"

export const Socket = ()=> {

    const {set_messages,active_chat} = useContext(Chat_window_context);
    const {socket,set_chats} = useContext(User_context);
    const message_sound_ref = useRef(null);
    const chat_sound_ref = useRef(null);

    useEffect(()=>  {
        socket?.on('message_sent',data=> {
            set_chats(prev=> {
                const chats = prev?.filter(e=> e?._id !== data?._id);
                return [data,...chats]
            });
            console.log(active_chat?._id === data?._id,data?._id,active_chat?._id)
            if(active_chat?._id === data?._id) {
                set_messages(prev=> [...prev,data?.last_message]);
                chat_sound_ref.current.play();
            }else {
                message_sound_ref.current.play();
            }
        });

        return ()=> {
            socket?.off('message_sent');
        }
    },[]);


    return (
        <div className="">
            <audio ref={message_sound_ref} src="./new_message_sound.mp3" className=" hidden"></audio>
            <audio ref={chat_sound_ref} src="./new_message_sound_2.mp3" className=" hidden"></audio>
        </div>
    )
}