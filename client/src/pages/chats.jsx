import { useContext, useState } from "react";
import { User_context } from "../contexts/user.context";
import { ChatsContext } from "../contexts/chats.context";
import { NoActiveChat } from "../components/chats/NoActiveChat";
import { ChatWindow } from "../components/chatWindow/chatWindow";
import { Contacts } from "./contacts";
import { ChatHeader } from "../components/chats/chatHeader";
import { MainCard } from "../components/shared/mainCard";
import { ChatCardLastMessage } from "../components/chats/chatCardLastMessage";

export const Chats = ()=> {

    const {activeChat,setActiveChat} = useContext(ChatsContext);
    const {chats,user} = useContext(User_context);
    const [searchText,setSearchText] = useState('');
    const [isContactPage,setIsContcatPage] = useState(false);

    const handleActiveChat = (chat)=> {
        if(activeChat?._id === chat?._id) return;
        setActiveChat(chat)
    };

    return (
        <div className="flex h-full gap-1">
            <div className="flex flex-col rounded-lg bg-[#111b21]  max-h-full h-full w-full md:w-[380px] max-w-full">
                {
                    isContactPage ? 
                       <Contacts setIsContcatPage={setIsContcatPage} /> : (
                        <>
                            <ChatHeader 
                                setIsContcatPage={setIsContcatPage} 
                                setSearchText={setSearchText}
                                searchText={searchText}
                                />
                            <div className="flex-1 max-h-full overflow-y-auto p-3 pt-0">
                                {
                                    chats?.map(chat => (
                                        chat.last_message &&
                                        <MainCard 
                                            key={chat?._id} 
                                            avatarUrl={chat?.contact?.profile_picture} 
                                            isActive={chat?._id === activeChat?._id}
                                            name={chat?.contact?.name}
                                            time={chat?.last_message?.createdAt}
                                            onClick={() => handleActiveChat(chat)}
                                        >
                                             <ChatCardLastMessage 
                                                chat={chat} 
                                                user={user} 
                                                />
                                        </MainCard>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <div className={`${activeChat ? 'flex absolute z-20 left-0 top-0 w-full max-w-full md:static md:left-auto md:top-auto' : 'hidden md:flex'} max-w-dvw flex-2`}>
                {
                    activeChat ? 
                    <ChatWindow /> :
                    <NoActiveChat />
                }
            </div>
        </div>
    )
};