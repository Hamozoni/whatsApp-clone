"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User_context } from "./user.context";
import { fetch_data } from "@/lib/fetch_data";
 

export const Chat_window_context = createContext(null);

export const Chat_window_context_provider = ({children})=> {

    const {user,socket,set_chats} = useContext(User_context);
    const [active_chat,set_active_chat] = useState(null);
    const [is_document,set_is_document] = useState(false);
    const [messages, set_messages] = useState([]);
    const [message,set_message] = useState({});
    const [unread_message,set_unread_message] = useState([]);
    const [loading,set_loading] = useState(true);
    const [error,set_error] = useState(null);
    const message_sound_ref = useRef(null);

  

    useEffect(() => {
        set_messages([]);
        set_message({
          chat_id: active_chat?._id ?  active_chat?._id : null,
          sender: user?._id,
          contact: active_chat?.contact?._id,
          text:'',
          type:'TEXT',
          status: 'SENT',
          file: null,
          replay_to: null
        });

        const fetch_messages = async ()=> {
            const data = await fetch_data(`/message?chat_id=${active_chat?._id}`,set_loading,set_error);
            console.log(data)
            if(data){
              set_messages(data?.messages);
      
            }
          };
      

          if(active_chat?._id) {
              fetch_messages();
          }

    },[active_chat]);


    useEffect(()=> {
        socket?.on('message_sent',data=> {
            set_chats(prev=> {
                const chats = prev?.filter(e=> e?._id !== data?._id);
                return [data,...chats]
            });

            // set_unread_message( prev => {
            //    const exist_chat = prev.find(e=> e._id === data?._id);

               
            //    if(exist_chat) {

            //       const new_chat = [];

            //       prev?.map( chat => {
            //          chat?._id === exist_chat?._id ? new_chat?.push({exist_chat,unread : [...exist_chat?.unread,data?.last_message]}) : new_chat?.push(chat)
            //       });

            //       return [...new_chat]
            //    }
            //   return [...prev,{_id: data?._id,unread : [data?.last_message]}] 
               
            // });

            console.log(unread_message)
            if(data?._id !== active_chat?._id) {
                message_sound_ref?.current?.play();
            }
        });

        return ()=> {
            socket?.off('message_sent');
        }
    },[])
    


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
                    set_active_chat,
                    loading,
                    error,
                    unread_message,
                    set_unread_message
                }
                }
        >
           <audio ref={message_sound_ref} src="./new_message_sound.mp3" className=" hidden"></audio>
            {children}
        </Chat_window_context.Provider>
    )
}