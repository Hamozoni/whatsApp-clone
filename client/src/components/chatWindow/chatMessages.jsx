
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/user.context';
import { MessageCard } from './messageCard';
import {ChatsContext } from '../../contexts/chats.context';
import { AiOutlineWechatWork } from "react-icons/ai";
import { Loading } from '../modal/loading';

const className = 'flex-1 overflow-y-auto space-y-2 p-4 bg-[#162127] rounded-lg my-1';

export const ChatMessages = () => {

  const {user,socket} = useContext(UserContext);
  const {messages,activeChat,loading,error,setMessages} = useContext(ChatsContext);

  const chatSoundRef = useRef(null);

  useEffect(()=> {
    if(!activeChat._id) return
    socket?.on('message_sent',data=> {
      if(activeChat?._id === data?._id) {
          setMessages(prev=> [...prev,data?.last_message]);
          chatSoundRef?.current?.play()
      }
    })

  return ()=> {
      socket?.off('message_sent');
     }
  },[socket])

  if(!activeChat._id) {
    return (
      <div className={className}>
        <div className="flex flex-col w-full h-full justify-center items-center">
              <AiOutlineWechatWork size={50}/>
              <h4 className='text-2xl'>start new chat</h4>
        </div>
      </div>
    )
  };


  if(error){
    return (
      <div className={className}>
        <h3>{error}</h3>
      </div>
    )
  }

  return (
              
      <div className={className}>
            <audio 
                ref={chatSoundRef} 
                src="./new_message_sound_2.mp3" 
                className=" hidden"
                >
              </audio>
            {
                loading ? 
                <div className={className}>
                  <Loading />
                </div>
                  : messages?.map(message => (
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