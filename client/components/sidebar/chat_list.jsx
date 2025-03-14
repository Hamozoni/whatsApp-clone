import { RiChatNewLine } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Chat_card } from "./chat_card";
import { useState } from "react";
import { Search_form } from "../inputs/search_form";
import { Contacts } from "../contacts/contacts";


const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', timestamp: '10:30 AM', unread: 2, online: true, avatar: '/whatsapp_bg.png' },
    { id: 2, name: 'Jane Smith', lastMessage: 'See you tomorrow!', timestamp: '9:45 AM', unread: 0, online: false, avatar: '/whatsapp_bg.png' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Thanks for the help!', timestamp: 'Yesterday', unread: 1, online: true, avatar: '/whatsapp_bg.png' },
  ];
  
  const messages = [
    { id: 1, text: 'Hey, how are you?', sender: 'them', timestamp: '10:30 AM', status: 'delivered' },
    { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'me', timestamp: '10:31 AM', status: 'read' },
    { id: 3, text: 'Pretty good! Want to grab lunch?', sender: 'them', timestamp: '10:32 AM', status: 'delivered' },

  ];

const Chat_list = ()=> {

    const [activeChat, setActiveChat] = useState(1);
    const [search_value,set_search_value] = useState('');
    const [is_contacts,set_is_contact] = useState(false);


    return (
        is_contacts ? <Contacts set_is_contact={set_is_contact}  /> :
        <div className="">
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
                    {chats.map(chat => (
                        <Chat_card 
                            activeChat={activeChat} 
                            setActiveChat={setActiveChat} 
                            key={chat?.id} 
                            chat={chat} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Chat_list;