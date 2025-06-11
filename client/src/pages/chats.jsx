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

    const {activeChat} = useContext(ChatsContext);
    const {chats,user} = useContext(User_context);
    const [searchText,setSearchText] = useState('');
    const [isContactPage,setIsContcatPage] = useState(false)

    return (
        <div className="flex">
            <div className="flex flex-col border-r border-r-[#213036] max-h-dvh h-dvh w-full md:w-[380px] max-w-full">
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
                                        <MainCard 
                                            key={chat?._id} 
                                            avatarUrl={chat?.contact?.profile_picture} 
                                            name={chat?.contact?.name}
                                            time={chat?.last_message?.createdAt}
                                        >
                                             <ChatCardLastMessage chat={chat} user={user} />
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