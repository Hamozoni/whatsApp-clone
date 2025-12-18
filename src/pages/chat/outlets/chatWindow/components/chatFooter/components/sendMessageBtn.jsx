import { useContext, useState } from "react";
import {ChatsContext,UserContext } from "../../../../../../../contexts/index";
import { LuSendHorizontal } from "react-icons/lu"
import { handleSendMessage } from "../../../../../../../lib/handleSendMessage";


export const SendMessageBtn = ()=> {

    // const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);


    const {
        message,
        setActiveChat,
        activeChat,
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
                    activeChat,
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
                          status: 'PENDING',
                        }
                      } );
                    setIsPreview(false);
                }

            }}
            className="px-2 py-3 rounded-md text-white transition-colors"
            >
            <LuSendHorizontal className="h-6 w-6 text-[#f7f8fa] cursor-pointer " />
        </button>
    )
}