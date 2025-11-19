import { useContext, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import Contacts  from "../contact/contacts";
import { ChatsHeader } from "./components/chatsHeader";
import { MainCard } from "../../components/shared/mainCard";
import { ChatCardLastMessage } from "./components/chatCardLastMessage";
import { useChats } from "../../hooks/queries/useChatsApi";
import { Loading } from "../../components/modal/loading";
import { UserContext } from "../../contexts";

const Chats = ()=> {

    const [searchText,setSearchText] = useState('');
    const [showContactPage,setShowContcatPage] = useState(false);

    const {user} = useContext(UserContext)

    const {data, isLoading} = useChats();

    const {contactId} = useParams();

    // const navigate = useNavigate();

    // const handleActiveChat = (chat)=> {
    //     if(contactId === chat?.contact?._id) return;
    //     navigate(`/chats/${chat?.contact?._id}`)
    // };

    if(isLoading){
        return <Loading />
    };

    console.log(data)


    const ChatsList = ()=> {
        return (
            
            data?.map(chat => {
                const contact = chat?.participants.filter(e=> e._id === user?._id);

                return (
                    <MainCard 
                        key={chat?._id} 
                        avatarUrl={contact?.photoURL} 
                        isActive={contact?._id === contactId}
                        name={contact?.displyName}
                        time={chat?.lastMessage?.createdAt}
                        onClick={() => ''}
                    >
                        <ChatCardLastMessage 
                            chat={chat} 
                            user={user} 
                            />
                    </MainCard>
                )
            })
        )
    }

    return (
        <div className="flex h-full gap-1 flex-1 overflow-y-auto">
            <section className="flex flex-col rounded-lg  bg-p max-h-full h-full w-full  min-w-[380px] md:w-[380px] max-w-full">
                {
                    showContactPage ? 
                    <Contacts setIsContcatPage={setShowContcatPage} /> : (
                        <>
                            <ChatsHeader 
                                setIsContcatPage={setShowContcatPage} 
                                setSearchText={setSearchText}
                                searchText={searchText}
                                />
                            <div className="flex-1 h-full max-h-full overflow-y-auto p-3 pt-0">
                                  <ChatsList />
                            </div>
                        </>
                    )
                }
            </section>
            <section className={`${contactId ? 'flex absolute z-20 bg-cyan-950 left-0 top-0 w-full max-w-full md:static md:left-auto md:top-auto' : 'hidden md:flex'} max-w-dvw flex-2`}>
                <Outlet />
            </section>
        </div>
    )
};

export default Chats;