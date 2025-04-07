import { useContext, useEffect, useRef, useState } from "react";
import { User_context } from "../../contexts/context";
import { useSocket } from "@/hooks/useSocket";
import update_message_status from "@/utils/update_mesages_status.js";
import axios from "axios";

export const Chat_card = ({chat_info})=> {

    const {user,active_chat,set_active_chat} = useContext(User_context);
    const sound_ref = useRef(null);
    const [contact,set_contact] = useState(null);
    const [text_time,set_text_time] = useState(null);
    const [chat,set_chat] = useState(chat_info);
    const [unread,set_unread] = useState(0);
    const socket = useSocket();

    const fetch_unread_messages = async () => {

        try {
            if(active_chat?._id === chat?._id) {
                set_unread(0);
            }else {
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat?user_id=${user?._id}&chat_id=${chat?._id}`);
                set_unread(data?.unread_messages);

            }

        }
        catch(error) {
            console.log(error.message)
        }
    }

    useEffect(()=> {
        const contact = chat?.members?.filter(e=> e?._id !== user?._id)[0];
        set_contact(contact);
        const text_time = new Date(chat?.last_message?.createdAt).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'});
        set_text_time(text_time);
        fetch_unread_messages();
        update_message_status(socket,chat?._id,contact?._id,'DELIVERED');
    },[]);

    useEffect(()=>{
        console.log('how many times', active_chat)
        if(chat?._id === active_chat?._id){
            set_unread(0);
        }
    },[active_chat,chat])

    useEffect(()=> {

        socket?.emit('join_room',chat?._id);
        

        socket?.on('send_message',chat => {

            console.log('is the same chat ' , chat,active_chat)
            set_chat(prev=> ({...chat,members: prev?.members}));
            if(user?._id !== chat?.last_message?.sender) {

                if(chat?.last_message?.status === 'SENT') {
                    update_message_status(socket,chat?._id,contact?._id,'DELIVERED');
                }
                if(chat?._id !== active_chat?._id) {
                    set_unread(prev=> prev + 1)
                    sound_ref.current = new Audio('./new_message_sound.mp3')
                    sound_ref.current.play();
                }else {
                    set_unread(0);
                }
            };


        });

        socket?.on('message_status_changed', data => {
            console.log(data)
            set_chat(prev=> ({...prev,last_message: {...prev?.last_message,status: data?.status}}));
        });

        return ()=> {
            socket?.off('send_message');
            socket?.off('message_status_changed');
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
                        {chat?.last_message?.text?.length > 29 ? `${chat?.last_message?.text?.slice(0,28)}...`: chat?.last_message?.text}
                    </p> 
                     {unread > 0 && (
                        <span className="bg-emerald-800  text-white rounded-full px-2 py-1 text-xs min-w-[20px] text-center">
                        {unread}
                        </span>
                     )}
                </div>
            </div>
        </div>
    )
}