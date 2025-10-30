import {ChatsContext } from "../../contexts/chats.context";
import { UserContext } from "../../contexts/user.context";
import { useContext, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu"
import { handleSendMessage } from "../../lib/handleSendMessage";


export const SendMessageBtn = ()=> {

    // const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);


    const {
        message,
        setActiveChat,
        setText,
        setIsRecorder,
        setMessage,
        setIsPreview,
    } = useContext(ChatsContext);

    const {socket,setChats} = useContext(UserContext);

    return (
        <button
            onClick={()=>{
                handleSendMessage({
                            message,
                            setChats,
                            setActiveChat,
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