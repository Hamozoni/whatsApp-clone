
"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { User_context } from '../../contexts/user.context';
import { Message_card } from './message_card';
import { Loading_component } from '../ui/loading_component';
import { useSocket } from '@/hooks/useSocket';
import update_message_status from '@/utils/update_mesages_status';
import { Use_fetch } from '@/hooks/use_fetch';
import { Chat_window_context } from '@/contexts/chat_window.context';

const className = 'flex-1 overflow-y-auto space-y-2 p-4 bg-[#111b21] bg-opacity-60 bg-chat-pattern hide_model'

const Active_chat = () => {

  
  const {user,active_chat} = useContext(User_context);
  const {messages,set_messages} = useContext(Chat_window_context);

  if(!active_chat._id) {
    return (
      <div className={className}>
         <h4>no active_chat._id</h4>
      </div>
    )
  }
  const {data,loading,error} = Use_fetch({end_point:`/message?chat_id=${active_chat?._id}`});

  const socket = useSocket();
  const sound_ref = useRef(null);

  useEffect(()=> {
    console.log(data,loading,error)
    set_messages(data?.messages);
  },[loading]);


  useEffect(() => {

    socket?.emit('join_room',active_chat?._id);

    socket?.on('send_message',chat => {
      if(chat?.last_message?.sender !== user?._id) {
        set_messages(prev=> [...prev,chat?.last_message]);
        update_message_status(socket,active_chat?._id,receiver?._id,'READ');
        sound_ref.current = new Audio('./new_message_sound_2.mp3')
        sound_ref.current.play();
      }

    });


    socket?.on('message_status_changed', data => {
      set_messages(prev=> {
        let new_messages = [];
        prev?.forEach( e => {
          if(e.sender === data?.sender && e.status !== 'READ') {
            new_messages.push({...e,status: data?.status})
          }else {
            new_messages.push(e)
          }
        });

        return [...new_messages]
      })
    });

    return ()=> {
      socket?.off('send_message');
      socket?.off('message_status_changed');
    }
    
},[socket]);
  

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

export default Active_chat;