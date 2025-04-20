import { useContext, useEffect, useRef, useState } from "react";
import { User_context } from "../../contexts/user.context";
import update_message_status from "@/utils/update_mesages_status.js";
import { fetch_data } from "@/lib/fetch_data";
import { Chat_window_context } from "@/contexts/chat_window.context";
import { FaRegImage,FaMicrophone ,FaVideo } from "react-icons/fa6";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

export const Chat_card = ({chat})=> {
    
    const {user,socket} = useContext(User_context);
    const {active_chat,set_active_chat} = useContext(Chat_window_context);
    const [text_time,set_text_time] = useState(null);
    const [unread,set_unread] = useState(0);
    const [loading,set_loading] = useState(false);
    const [error,set_error] = useState(null);


    const fetch_unread_messages = async (user_id,chat_id) => {
        const data = await fetch_data(`chat?user_id=${user_id}&chat_id=${chat_id}`,set_loading,set_error);

        if(data) {
            set_unread(data?.unread_messages)
        }
    };


    useEffect(()=> {
        const text_time = new Date(chat?.last_message?.createdAt || chat?.last_message?.updatedAt)
        .toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'});
        set_text_time(text_time);
        update_message_status(socket,chat?._id,chat?.contact?._id,'DELIVERED');
        fetch_unread_messages(user?._id,chat?._id);
    },[]);

    useEffect(()=>{
        if(chat?._id === active_chat?._id){
            set_unread(0);
        }
    },[active_chat]);


    return (
        chat?.last_message &&
        <div
            onClick={()=> chat?._id === active_chat?._id ? '' : set_active_chat(chat)}
            className={`flex items-center cursor-pointer px-3 hover:bg-[#31414b] ${
                active_chat?._id === chat._id ? 'bg-[#222e35]' : '' }`}
            >
            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={chat?.contact?.profile_picture} alt={chat?.contact?.name} className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="ml-4 flex-1 py-3 min-w-0 border-b-1 border-[#222e35] text-[#f7f8fa]">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold truncate">
                        {chat?.contact?.name}
                    </h2>
                    <span className="text-xs text-[#667781]">
                        {text_time}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                     <div className="text-sm text-[#667781] truncate flex items-center gap-2">
                        {
                        user?._id === chat?.last_message?.sender && (
                        <span className={chat?.last_message?.status === 'READ' ? 'text-emerald-400' : ''}>
                            {chat?.last_message?.status === 'SENT' ? '✓ ' :  '✓✓ ' }</span>)
                        }
                        {
                            chat?.last_message.type === 'MEDIA' && (
                                chat?.last_message?.file?.type === 'AUDIO' ?
                                <><FaMicrophone /> Audio</>: 
                                chat?.last_message?.file?.type === 'VIDEO' ?
                                <><FaVideo /> Video</>:
                                chat?.last_message?.file?.type === 'IMAGE' ?
                               <><FaRegImage /> Photo</>  : 
                               <><BsFillFileEarmarkPdfFill /> {chat?.last_message?.file?.name?.splice(0,28)}</> 
                            )
                        }
                        {chat?.last_message?.text?.length > 29 ? `${chat?.last_message?.text?.slice(0,28)}...`: chat?.last_message?.text}
                    </div> 
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