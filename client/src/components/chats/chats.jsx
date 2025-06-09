import { RiChatNewLine } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ChatCard } from "./chatCard";
import { useContext, useState } from "react";
import { SearchInput } from "../ui/searchInput";
import { User_context } from "../../contexts/user.context";
import { ChatsContext } from "../../contexts/chats.context";
import { NoActiveChat } from "./NoActiveChat";
import { ChatWindow } from "../chatWindow/chatWindow";


export const Chats = ()=> {

    const {activeChat} = useContext(ChatsContext);
    const {chats} = useContext(User_context);
    const [searchText,setSearchText] = useState('');

    return (
        <div className="flex">
            <div className="flex flex-col border-r border-r-[#213036] max-h-dvh h-dvh w-full md:w-[350px] max-w-full">
                <header className="p-3 mb-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold">
                            Chats
                        </h3>
                        <div className="flex items-center">
                            <button className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                                <RiChatNewLine size={18} className='text-[#f7f8fa]'/>
                            </button>
                            <div className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                                <PiDotsThreeOutlineVerticalFill size={18} className='text-[#f7f8fa]'/>
                            </div>    
                        </div>
                    </div>
                    <SearchInput text={searchText} setText={setSearchText} handle_search={()=> ''} />
                </header>
                <div className="flex-1 max-h-full overflow-y-auto p-3">
                    {
                        chats?.map(chat => (
                            chat.last_message &&
                            <ChatCard 
                                key={chat?._id} 
                                chat={chat} 
                            />
                        ))
                    }
                </div>
            </div>
            <div className={`${activeChat ? 'flex absolute z-20 left-0 top-0 w-full h-full max-w-full md:static md:left-auto md:top-auto' : 'hidden md:flex'} max-w-dvw flex-2`}>
                {
                    activeChat ? 
                    <ChatWindow /> :
                    <NoActiveChat />
                }
            </div>
        </div>
    )
};