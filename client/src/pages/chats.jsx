import { useContext, useState } from "react";
import { UserContext } from "../contexts/user.context";
import { ChatsContext } from "../contexts/chats.context";
import { NoActiveChat } from "../components/chats/NoActiveChat";
import { ChatWindow } from "../components/chatWindow/chatWindow";
import { Contacts } from "./contacts";
import { ChatHeader } from "../components/chats/chatHeader";
import { MainCard } from "../components/shared/mainCard";
import { ChatCardLastMessage } from "../components/chats/chatCardLastMessage";
import { useNavigate, useParams } from "react-router-dom";

export const Chats = ()=> {

    const {activeChat,setActiveChat} = useContext(ChatsContext);
    const {chats,user} = useContext(UserContext);
    const [searchText,setSearchText] = useState('');
    const [isContactPage,setIsContcatPage] = useState(false);

    const {id} = useParams();

    const navigate = useNavigate()

    const handleActiveChat = (chat)=> {
        if(id === chat?._id) return;
        setActiveChat(chat);
        navigate(`/chats/${chat?._id}`)
    };

    return (
        <div className="flex h-full gap-1 flex-1 overflow-y-auto">
            <div className="flex flex-col rounded-lg  bg-p max-h-full h-full w-full  min-w-[380px] md:w-[380px] max-w-full">
                {
                    isContactPage ? 
                       <Contacts setIsContcatPage={setIsContcatPage} /> : (
                        <>
                            <ChatHeader 
                                setIsContcatPage={setIsContcatPage} 
                                setSearchText={setSearchText}
                                searchText={searchText}
                                />
                            <div className="flex-1 h-full max-h-full overflow-y-auto p-3 pt-0">
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
            <div className={`${activeChat ? 'flex absolute z-20 bg-cyan-950 left-0 top-0 w-full max-w-full md:static md:left-auto md:top-auto' : 'hidden md:flex'} max-w-dvw flex-2`}>
                {
                    activeChat ? 
                    <ChatWindow /> :
                    <NoActiveChat />
                }
            </div>
        </div>
    )
};