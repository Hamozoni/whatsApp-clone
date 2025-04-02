import { useContext, useEffect, useState } from "react";
import { User_context } from "../../contexts/context";
import { useSocket } from "@/hooks/useSocket";
import axios from "axios";
import update_status from "@/utils/update_mesages_status";

export const Chat_card = ({chat_info})=> {

    const {user,active_chat,set_active_chat} = useContext(User_context);

    const [contact,set_contact] = useState(null);
    const [text_time,set_text_time] = useState(null);
    const [chat,set_chat] = useState(chat_info);
    const socket = useSocket();


    const updated_data = ()=> {
        const data = {
            chat_id: chat?._id,
            sender: chat?.members?.filter(e=> e?._id !== user?._id)[0]?._id,
            status: 'DELIVERED'
        };

        update_status(data)
        .then((data)=> {
            if(data?.status) {
                const info = {
                    chat_id: chat?._id,
                    messages: data?.messages
                  };
                  socket.emit('join_room',chat?._id);
                  socket.emit('message_delivered',info);

            }
        })
    };

    useEffect(()=> {
        if(!socket) return;
        const contact = chat?.members?.filter(e=> e?._id !== user?._id)[0];
        set_contact(contact);
        const text_time = new Date(chat?.last_message?.createdAt).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'});
        set_text_time(text_time);
        updated_data();

    },[chat]);

    useEffect(()=> {
        if(!socket) return;
        socket.emit('join_room',chat?._id);

        socket.on('message_sent',chat => {
            set_chat(prev=> ({...prev,last_message: chat?.last_message}));
            if(user?._id !== chat?.last_message?.sender) {
                updated_data();
            }

        });

        socket.on('message_arived',messages => {
            set_chat(prev=> ({...prev,last_message: messages[messages?.length - 1]}));
        })

        return ()=> {
            socket.off('message_sent');
            socket.off('message_seen');
            socket.off('message_arived');
          }
    },[socket]);

    return (
        chat?.last_message &&
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