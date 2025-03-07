// app/page.js
'use client';

import { useState } from 'react';
import { IoCameraOutline,IoSearchOutline } from "react-icons/io5";
import { RxDotsVertical } from "react-icons/rx";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiMiniPaperClip,HiOutlineMicrophone } from "react-icons/hi2";

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

export default function WhatsAppHome() {

  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState(messages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messageList.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessageList([...messageList, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5]">

      <div className="w-1/3 border-r bg-white">
        <div className="p-4 bg-[#f0f2f5] border-b flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img src="/avatars/user.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex space-x-4">
            <IoCameraOutline className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <IoSearchOutline className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <RxDotsVertical className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-4rem)]">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center p-4 border-b cursor-pointer hover:bg-[#f5f6f6] ${
                activeChat === chat.id ? 'bg-[#f0f2f5]' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
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


      <div className="flex-1 flex flex-col">

        <div className="p-4 bg-[#f0f2f5] border-b flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/avatars/1.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="ml-4 flex-1">
            <h2 className="font-semibold text-[#111b21]">
              {chats.find(chat => chat.id === activeChat)?.name}
            </h2>
            <p className="text-sm text-[#667781]">
              {chats.find(chat => chat.id === activeChat)?.online ? 'online' : 'offline'}
            </p>
          </div>
          <div className="flex space-x-4">
            <IoSearchOutline className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <RxDotsVertical className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2] bg-opacity-60 bg-chat-pattern">
          <div className="space-y-2">
            {messageList.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[65%] rounded-lg p-3 relative ${
                    message.sender === 'me'
                      ? 'bg-[#d9fdd3] ml-12'
                      : 'bg-white mr-12'
                  }`}
                  style={{
                    boxShadow: '0 1px 0.5px rgba(11,20,26,.13)'
                  }}
                >
                  <p className="text-[#111b21] text-sm">{message.text}</p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-[10px] text-[#667781]">{message.timestamp}</span>
                    {message.sender === 'me' && (
                      <span className="text-[10px] text-[#667781]">
                        {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓' : '◷'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#f0f2f5] border-t">
          <div className="flex items-center space-x-2">
            <HiOutlineEmojiHappy className="h-6 w-6 text-[#54656f] cursor-pointer hover:text-[#00a884]" />
            <HiMiniPaperClip className="h-6 w-6 text-[#54656f] cursor-pointer hover:text-[#00a884] rotate-90" />
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message"
                className="w-full pl-4 pr-12 py-2 rounded-lg bg-white border focus:outline-none focus:border-[#00a884] text-[#111b21]"
              />
              <HiOutlineMicrophone className="h-6 w-6 text-[#54656f] absolute right-2 top-2 cursor-pointer hover:text-[#00a884]" />
            </div>

            <button
              onClick={handleSendMessage}
              className="bg-[#00a884] p-2 rounded-full text-white hover:bg-[#008f76] transition-colors"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
                <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}