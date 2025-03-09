"use client"
import React, { useState } from 'react';
import Options_icons from './options_icons';
import Chat_list from './chat_list';


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
        <div className="grow">
          <Chat_list />
        </div>


    </section>

    
  );
};

export default Sidebar;

// Messages
// <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#111b21]">
//   {/* Received message */}
//   <div className="flex items-start bg-[#222e35] w-fit max-w-1/2 rounded-md">
//     <div className="p-3 rounded-lg ">
//         Hello, how are you?
//     </div>
//   </div>

//   {/* Sent message */}
//   <div className="flex justify-end">
//     <div className="bg-[#00a884] p-3 rounded-lg max-w-[75%]">
//       <span className="font-semibold">You:</span> I'm good, thanks!
//     </div>
//   </div>
// </div>

// Input
// <div className="p-4 bg-[#222e35]">
//   <div className="flex items-center">
//     <input
//       type="text"
//       placeholder="Type a message"
//       className="w-full p-3 rounded-lg bg-[#303f47] text-[#f7f8fa] text-sm"
//     />
//     <button className="text-[#128C7E] ml-2">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         width="24"
//         height="24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M21 2L12 13l-3-3-7 7V4h18z" />
//       </svg>
//     </button>
//   </div>
// </div>


