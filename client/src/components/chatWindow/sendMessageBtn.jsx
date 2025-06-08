import {ChatsContext } from "../../contexts/chats.context";
import { User_context } from "../../contexts/user.context";
import { handle_send_message } from "../../lib/handle_send_message";
import { useContext, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu"


export const SendMessageBtn = ()=> {

    // const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);


    const {
        message,
        setActiveChat,
        setText,
        activeChat,
        setIsRecorder,
        setMessage,
        setIsPreview,
        setMessages
    } = useContext(ChatsContext);

    const {socket,set_chats} = useContext(User_context);

    return (
        <button
            onClick={()=>{
                handle_send_message({
                    message,
                    set_chats,
                    active_chat: activeChat,
                    set_active_chat: setActiveChat,
                    set_messages: setMessages,
                    socket
                });
                if(!error) {
                    setText('');
                    setIsRecorder(false);
                    setMessage( prev => {
                        return {
                          chat_id: prev?.chatId,
                          sender: prev?.sender,
                          contact: prev?.contact,
                          text:'',
                          type:'TEXT',
                          status: 'SENT',
                        }
                      } );
                    setIsPreview(false);
                }

            }}
            className="px-2 py-3 rounded-md text-white transition-colors hide_model"
            >
            <LuSendHorizontal className="h-6 w-6 text-[#f7f8fa] cursor-pointer " />
        </button>
    )
}