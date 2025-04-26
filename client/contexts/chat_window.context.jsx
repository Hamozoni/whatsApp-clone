"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User_context } from "./user.context";
import { fetch_data } from "@/lib/fetch_data";
 

export const Chat_window_context = createContext(null);

export const Chat_window_context_provider = ({children})=> {

    const {user,socket,set_chats} = useContext(User_context);
    const [active_chat,set_active_chat] = useState(null);
    const [is_preview,set_is_preview] = useState(false);
    const [is_recorder,set_is_recorder] = useState(false);
    const [is_camera,set_is_camera] = useState(false);
    const [is_call,set_is_call] = useState(false);

    const [messages, set_messages] = useState([]);
    const [message,set_message] = useState({});
    const [text,set_text] = useState('');
    const [unread_message,set_unread_message] = useState([]);
    const [loading,set_loading] = useState(true);
    const [error,set_error] = useState(null);
    const [selected_gallery_file,set_selected_gallery_file] = useState(null);
    const [is_gallery_file,set_is_gallery_file] = useState(false);
    const message_sound_ref = useRef(null);

  

    useEffect(() => {
        set_messages([]);
        set_text('')
        set_message({
          chat_id: active_chat?._id ?  active_chat?._id : null,
          sender: user?._id,
          contact: active_chat?.contact?._id,
          text:'',
          type:'TEXT',
          status: 'SENT',
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

            if(data?._id !== active_chat?._id) {
                message_sound_ref?.current?.play();
            }
        });

        socket?.on('signal',(data)=> {
            console.log(data);
            set_is_call(true)
        })

        return ()=> {
            socket?.off('message_sent');
        }
    },[])
    


    return (
        <Chat_window_context.Provider
            value={
                {
                    is_preview,
                    set_is_preview,
                    messages,
                    set_messages,
                    message,
                    set_message,
                    active_chat,
                    set_active_chat,
                    loading,
                    error,
                    unread_message,
                    set_unread_message,
                    text,
                    set_text,
                    is_recorder,
                    set_is_recorder,
                    selected_gallery_file,
                    set_selected_gallery_file,
                    is_gallery_file,
                    set_is_gallery_file,
                    is_camera,
                    set_is_camera,
                    is_call,
                    set_is_call
                }
                }
        >
           <audio ref={message_sound_ref} src="./new_message_sound.mp3" className=" hidden"></audio>
            {children}
        </Chat_window_context.Provider>
    )
}