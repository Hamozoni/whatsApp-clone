
"use client";
import React, { useContext, useEffect, useRef } from 'react';
import { User_context } from '../../contexts/user.context';
import { Message_card } from './message_card';
import { Loading_component } from '../ui/loading_component';
import { Chat_window_context } from '@/contexts/chat_window.context';
import { AiOutlineWechatWork } from "react-icons/ai";
import { Media_capture } from './media_capture';

const className = 'flex-1 overflow-y-auto space-y-2 p-4 bg-[#111b21] bg-opacity-60 bg-chat-pattern hide_model'

export const Active_chat = () => {

  const {user,socket} = useContext(User_context);
  const {messages,active_chat,loading,error,set_messages,is_camera} = useContext(Chat_window_context);


  const chat_sound_ref = useRef(null);

  useEffect(()=> {
    if(!active_chat._id) return
    socket?.on('message_sent',data=> {
      if(active_chat?._id === data?._id) {
          set_messages(prev=> [...prev,data?.last_message]);
          chat_sound_ref?.current?.play()
      }else {
      }
    })

  return ()=> {
      socket?.off('message_sent');
     }
  },[socket])

  if(!active_chat._id) {
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
            <audio ref={chat_sound_ref} src="./new_message_sound_2.mp3" className=" hidden"></audio>
            {
              is_camera && 
              <Media_capture />
            }
            {
                loading ? 
                <div className={className}>
                  <Loading_component />

                </div>
                  : messages?.map(message => (
                    <Message_card 
                      key={message?._id} 
                      message={message} 
                      user_id={user?._id}
                    />
                ))
              }
     </div> 
  );
};