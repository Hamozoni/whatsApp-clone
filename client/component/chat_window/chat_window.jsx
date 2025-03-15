
"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Chat_header } from './chat_header';
import { Message_input } from './message_input';
import { User_context } from '../context';

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

const Chat_window = () => {

    const {user,chats,set_chats,active_chat_id} = useContext(User_context);


    const [newMessage, setNewMessage] = useState('');
    const [messageList, setMessageList] = useState(messages);
    const [resiver, set_resiver] = useState(null);

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
    
    useEffect(()=> {
     const chat = chats?.filter(e=> e.id === active_chat_id)[0]
     console.log(active_chat_id);
      set_resiver(chat?.members?.filter(e=> e.id !== user?.uid)[0]);

      console.log(chat?.members?.filter(e=> e.id !== user?.uid)[0])
    },[active_chat_id])


  return (
    <div className="flex-1 h-screen max-h-full flex flex-col text-[#f7f8fa]">
      <Chat_header resiver={resiver} />
      <div className="flex-1 overflow-y-auto p-4 bg-[#111b21] bg-opacity-60 bg-chat-pattern">
          <div className="space-y-2 text-[#f7f8fa]">
            {
            messageList.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[65%] rounded-lg p-3 relative ${
                    message.sender === 'me'
                      ? 'bg-emerald-800  ml-12'
                      : 'bg-[#222e35] mr-12'
                  }`}
                  style={{
                    boxShadow: '0 1px 0.5px rgba(11,20,26,.13)'
                  }}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-[10px] ">
                        {message.timestamp}
                    </span>
                    {message.sender === 'me' && (
                      <span className="text-[10px]">
                        {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓' : '◷'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message input */}
        <Message_input />

    </div>
  );
};

export default Chat_window;
