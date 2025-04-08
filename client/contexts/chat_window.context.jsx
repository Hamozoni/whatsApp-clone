"use client";
import { useSocket } from "@/hooks/useSocket";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User_context } from "./user.context";
import update_message_status from "@/utils/update_mesages_status";

 

export const Chat_window_context = createContext(null);

export const Chat_window_context_provider = ({children})=> {

    const socket = useSocket();
    const {user,active_chat} = useContext(User_context);
    const [is_document,set_is_document] = useState(false);
    const [messages, set_messages] = useState([]);
    const [receiver, set_receiver] = useState(null);
    const [is_loading, set_is_loading] = useState(false);
    const [error, set_error] = useState(null);
    const sound_ref = useRef(null);
  

    const fetch_messages = async ()=> {
        
      set_is_loading(true);
      set_error(null);
      try {

        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/message?chat_id=${active_chat?._id}`);

        if(data?.status) {
            set_messages(data?.messages);
        }
        else {
          set_error(data?.message)
        }
      }
      catch (error) {
        set_error(error?.message)
      }
      finally {
        set_is_loading(false)
      }
    };

    useEffect(() => {
    if(!active_chat) return
      set_messages([]);
      const receiver = active_chat.members.filter(e=> e._id !== user?._id)[0]
      set_receiver(receiver);
      if(!active_chat?._id) return
        fetch_messages();
        update_message_status(socket,active_chat?._id,receiver?._id,'READ');
    },[active_chat]);
    
    
    useEffect(() => {
      if(!active_chat?._id) return;

      socket?.emit('join_room',active_chat?._id);
      socket?.on('send_message',chat => {

        if(chat?.last_message?.sender !== user?._id) {
          set_messages(prev=> [...prev,chat?.last_message]);
          update_message_status(socket,active_chat?._id,receiver?._id,'READ');
          
          sound_ref.current = new Audio('./new_message_sound_2.mp3')
          sound_ref.current.play();
        }

      });


      socket?.on('message_status_changed', data => {
        set_messages(prev=> {
          let new_messages = [];
          prev?.forEach( e => {
            if(e.sender === data?.sender && e.status !== 'READ') {
              new_messages.push({...e,status: data?.status})
            }else {
              new_messages.push(e)
            }
          });

          return [...new_messages]
        })
      });

      return ()=> {
        socket?.off('send_message');
        socket?.off('message_status_changed');
      }
      
  },[socket,active_chat]);

    return (
        <Chat_window_context.Provider
            value={
                {
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