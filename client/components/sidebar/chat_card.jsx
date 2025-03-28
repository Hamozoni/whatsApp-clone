import { useContext, useEffect, useState } from "react";
import { User_context } from "../../contexts/context";
import { useSocket } from "@/hooks/useSocket";
import axios from "axios";

export const Chat_card = ({chat_info})=> {

    const {user,active_chat,set_active_chat} = useContext(User_context);

    const [contact,set_contact] = useState(null);
    const [text_time,set_text_time] = useState(null);
    const [chat,set_chat] = useState(chat_info);
    const socket = useSocket()


    useEffect(()=> {
        const contact = chat?.members?.filter(e=> e?._id !== user?._id)[0];
        set_contact(contact);
        const text_time = new Date(chat?.last_message?.createdAt).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'});
        set_text_time(text_time);

    },[]);

    useEffect(()=> {
        if(!socket) return;

        socket.emit('join_room',chat?._id);

        socket.on('receive_message',async last_message=> {
            set_chat(prev=> ({...prev,last_message}));

            if(user?._id !== contact?._id) {
             const messages = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/message`,{sender:contact?._id,chat_id: chat?._id,status: 'DELIVERED'});
                socket.emit('message_deliverd',messages);
                set_chat(prev=> ({...prev,last_message: {...last_message,status: 'DELIVERED'}}));
            }
        });
    },[socket]);

    return (
        <div
            onClick={()=> set_active_chat(chat)}
            className={`flex items-center cursor-pointer px-3 hover:bg-[#31414b] ${
                active_chat?.id === chat.id ? 'bg-[#222e35]' : '' }`}
            >
            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={contact?.profile_picture} alt={contact?.name} className="w-full h-full object-cover" />
                </div>
                {
                    chat?.is_online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-800  rounded-full border-2 border-white"></div>
                    )
                }
            </div>
            <div className="ml-4 flex-1 py-3 min-w-0 border-b-1 border-[#222e35] text-[#f7f8fa]">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold truncate">{contact?.name}</h2>
                    <span className="text-xs text-[#667781]">
                        {text_time}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                     <p className="text-sm text-[#667781] truncate">
                        {
                        user?._id === chat?.last_message?.sender && (
                        <span className={chat?.last_message?.status === 'READ' ? 'text-emerald-400' : ''}>
                            {chat?.last_message?.status === 'SENT' ? '✓ ' :  '✓✓ ' }</span>)
                        }
                        {chat?.last_message?.text}
                    </p> 
                     {/* {chat.unread > 0 && (
                        <span className="bg-emerald-800  text-white rounded-full px-2 py-1 text-xs min-w-[20px] text-center">
                        {chat.unread}
                        </span>
                     )} */}
                </div>
            </div>
        </div>
    )
}