"use client"
import { RiChatNewLine } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Chat_card } from "./chat_card";
import { useContext, useEffect, useState } from "react";
import { Search_form } from "../ui/search_form";
import { Contacts } from "../contacts/contacts";
import { User_context } from "../../contexts/user.context";


const Chat_list = ()=> {

    const {chats,set_chats,active_chat,socket} = useContext(User_context);
    const [search_value,set_search_value] = useState('');
    const [is_contacts,set_is_contact] = useState(false);

    // useEffect(()=> {

    //     socket?.emit('join_room',active_chat?._id)

    //     socket?.on('message_sent',chat => {

    //         const exsist_chat = chats?.find(e=> e?._id === chat?._id);
    //         if(exsist_chat) return;

    //         set_chats(prev=> [chat,...prev]);

    //     });

    //     socket?.on('chat_created', data => {
            
    //         const exsist_chat = chats?.find(e=> e?._id === data?._id);
    //         if(exsist_chat) return;
    //         set_chats(prev=> [data,...prev]);
    //     })

    //     return ()=> {
    //         socket?.off('message_sent');
    //         socket?.off('chat_created');
    //     };
    // },[socket,active_chat])

    return (
        <div className=" relative">
            {is_contacts && <Contacts set_is_contact={set_is_contact}  />}
            <header className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">Chats</h3>
                    <div className="flex items-center">
                        <button onClick={()=> set_is_contact(true)} className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                            <RiChatNewLine size={18} className='text-[#f7f8fa]'/>
                        </button>
                        <div className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                            <PiDotsThreeOutlineVerticalFill size={18} className='text-[#f7f8fa]'/>
                        </div>    
                    </div>
                </div>
                <Search_form value={search_value} set_value={set_search_value} handle_search={()=> ''} />
            </header>
            <div className="overflow-y-auto max-h[calc(100vh-110px)] h-[calc(100vh-110px)]">
                <div className="">
                    {chats?.map(chat => (
                        // chat?.last_message?.length > 0 &&
                        <Chat_card 
                            key={chat?._id} 
                            chat={chat} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Chat_list;