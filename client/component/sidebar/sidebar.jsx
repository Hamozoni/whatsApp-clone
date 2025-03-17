
"use client"
import React, { useState } from 'react';
import Options_icons from './options_icons';
import Chat_list from './chat_list';
import { Setting } from './setting';


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


const Sidebar = ({user}) => {

  const [active_option,set_active_option] = useState('chats');
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState(messages);

  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     const newMsg = {
  //       id: messageList.length + 1,
  //       text: newMessage,
  //       sender: 'me',
  //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //       status: 'sent'
  //     };
  //     setMessageList([...messageList, newMsg]);
  //     setNewMessage('');
  //   }
  // };

  return (
    <section className='flex w-[450px] h-screen max-h-full'>
       <Options_icons 
         user_photo={user?.photoURL}
          active_option={active_option}
          set_active_option={set_active_option}
        />
        <section className="grow bg-[#111b21] text-[#f7f8fa] border-x-1 border-[#394b55] h-screen max-h-screen">
          {
            active_option === 'chats' ? 
            <Chat_list /> :
            active_option === 'settings' ? 
            <Setting /> : ''
          }
        </section>
    </section> 
  );
};

export default Sidebar;


