import { RiChatNewLine } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";


const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', timestamp: '10:30 AM', unread: 2, online: true, avatar: '/avatars/1.jpg' },
    { id: 2, name: 'Jane Smith', lastMessage: 'See you tomorrow!', timestamp: '9:45 AM', unread: 0, online: false, avatar: '/avatars/2.jpg' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Thanks for the help!', timestamp: 'Yesterday', unread: 1, online: true, avatar: '/avatars/3.jpg' },
  ];
  
  const messages = [
    { id: 1, text: 'Hey, how are you?', sender: 'them', timestamp: '10:30 AM', status: 'delivered' },
    { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'me', timestamp: '10:31 AM', status: 'read' },
    { id: 3, text: 'Pretty good! Want to grab lunch?', sender: 'them', timestamp: '10:32 AM', status: 'delivered' },
  ];

const Chat_list = ()=> {
    const [activeChat, setActiveChat] = useState(1);
    const [newMessage, setNewMessage] = useState('');
    const [messageList, setMessageList] = useState(messages);
    return (
        <section className="bg-[#111b21] text-[#f7f8fa] w-[337px]">
            <header className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">Chats</h3>
                    <div className="flex items-center">
                        <div className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                            <RiChatNewLine size={18} className='text-[#f7f8fa]'/>
                        </div>
                        <div className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                            <PiDotsThreeOutlineVerticalFill size={18} className='text-[#f7f8fa]'/>
                        </div>    
                    </div>
                </div>
                <div className="flex items-center bg-[#222e35] p-2 rounded-md">
                    <button className="cursor-pointer px-2">
                        <BiSearchAlt2 size={20} />
                    </button>
                    <input 
                        type="text" 
                        placeholder="search"
                        className="w-full focus:outline-0"
                         />
                </div>
            </header>
            <div className="">
                <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            className={`flex items-center p-4 border-b cursor-pointer hover:bg-[#f5f6f6] ${
                            activeChat === chat.id ? 'bg-[#f0f2f5]' : '' }`}
                            >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                                </div>
                                {
                                    chat.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )
                                }
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold text-[#111b21] truncate">{chat.name}</h2>
                                    <span className="text-xs text-[#667781]">{chat.timestamp}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-[#667781] truncate">{chat.lastMessage}</p>
                                    {chat.unread > 0 && (
                                        <span className="bg-[#00a884] text-white rounded-full px-2 py-1 text-xs min-w-[20px] text-center">
                                        {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default Chat_list;