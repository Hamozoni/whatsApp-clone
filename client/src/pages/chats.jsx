import { ChatCard } from "./chatCard";
import { useContext, useState } from "react";
import { User_context } from "../../contexts/user.context";
import { ChatsContext } from "../../contexts/chats.context";
import { NoActiveChat } from "./NoActiveChat";
import { ChatWindow } from "../../components/chatWindow/chatWindow";
import { Contacts } from "../contacts/contacts";
import { ChatHeader } from "./chatHeader";


export const Chats = ()=> {

    const {activeChat} = useContext(ChatsContext);
    const {chats} = useContext(User_context);
    const [searchText,setSearchText] = useState('');
    const [isContactPage,setIsContcatPage] = useState(false)

    return (
        <div className="flex">
            <div className="flex flex-col border-r border-r-[#213036] max-h-dvh h-dvh w-full md:w-[350px] max-w-full">
                {
                    isContactPage ? 
                       <Contacts setIsContcatPage={setIsContcatPage} /> : (
                        <>
                            <ChatHeader 
                                setIsContcatPage={setIsContcatPage} 
                                setSearchText={setSearchText}
                                searchText={searchText}
                                />
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
                        </>
                    )
                }
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