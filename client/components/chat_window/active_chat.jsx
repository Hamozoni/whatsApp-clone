
"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { User_context } from '../../contexts/user.context';
import { Message_card } from './message_card';
import { Loading_component } from '../ui/loading_component';
import { Chat_window_context } from '@/contexts/chat_window.context';
import { AiOutlineWechatWork } from "react-icons/ai";

const className = 'flex-1 overflow-y-auto space-y-2 p-4 bg-[#111b21] bg-opacity-60 bg-chat-pattern hide_model'

export const Active_chat = () => {

  const {user} = useContext(User_context);
  const {messages,active_chat,loading,error} = useContext(Chat_window_context);



  if(!active_chat._id) {
    return (
      <div className={className}>
        <div className="flex flex-col w-full h-full justify-center items-center">
              <AiOutlineWechatWork size={50}/>
              <h4 className='text-2xl'>start new chat</h4>
        </div>
      </div>
    )
  }

  if(error){
    return (
      <div className={className}>
        <h3>{error}</h3>
      </div>
    )
  }

  return (
              
      <div className={className}>
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