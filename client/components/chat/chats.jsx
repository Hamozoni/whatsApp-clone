"use client"
import { RiChatNewLine } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Chat_card } from "./chat_card";
import { useContext, useState } from "react";
import { Search_form } from "../ui/search_form";
import { Contacts } from "../contacts/contacts";
import { User_context } from "../../contexts/user.context";


export const Chats = ()=> {

    const {chats} = useContext(User_context);
    const [search_value,set_search_value] = useState('');
    const [is_contacts,set_is_contact] = useState(false);

    return (
        <div className=" relative flex-1 border-x border-[#213036] max-h-dvh h-dvh">
            {is_contacts && <Contacts set_is_contact={set_is_contact}  />}
            <header className="p-3 mb-2">
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
            <div className="overflow-y-auto">
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