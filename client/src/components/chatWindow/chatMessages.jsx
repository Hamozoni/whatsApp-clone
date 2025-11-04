
import { useContext, useLayoutEffect, useRef } from 'react';
import { UserContext } from '../../contexts/user.context';
import { MessageCard } from './messageCard';
import {ChatsContext } from '../../contexts/chats.context';
import { AiOutlineWechatWork } from "react-icons/ai";

const className = 'flex-1 overflow-y-auto space-y-2 p-4 bg-[#162127] rounded-lg my-1';

export const ChatMessages = () => {

  const {user} = useContext(UserContext);
  const {activeChat} = useContext(ChatsContext);

  const messagesContainerRef = useRef(null);

  useLayoutEffect(()=>{
    const messagesContainer = messagesContainerRef.current
    if(messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  },[activeChat]);

  if(!activeChat?.chat) {
    return (
      <div className={className}>
        <div className="flex flex-col w-full h-full justify-center items-center">
              <AiOutlineWechatWork size={50}/>
              <h4 className='text-2xl'>start new chat</h4>
        </div>
      </div>
    )
  };


  return (
              
      <div className={className} ref={messagesContainerRef}>
              {
                  activeChat?.chat?.messages?.map(message => (
                    <MessageCard 
                      key={message?._id} 
                      message={message} 
                      userId={user?._id}
                    />
                ))
              }
     </div> 
  );
};