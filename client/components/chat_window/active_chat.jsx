
"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Chat_header } from './chat_header';
import { Message_input } from './message_input';
import { User_context } from '../../contexts/context';
import axios from 'axios';
import { Message_card } from './message_card';
import { Loading_component } from '../ui/loading_component';
import { useSocket } from '@/hooks/useSocket';
import update_message_status from '@/utils/update_mesages_status';

const Active_chat = () => {

    
  const {user,active_chat} = useContext(User_context);
  
    const [messages, set_messages] = useState([]);
    const [receiver, set_receiver] = useState(null);
    const [is_loading, set_is_loading] = useState(false);
    const [error, set_error] = useState(null);
    const socket = useSocket();
  

    const fetch_messages = async ()=> {
        
      set_is_loading(true);
      set_error(null);
      try {

        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/message?chat_id=${active_chat?._id}`);

        if(data?.status) {
            set_messages(data?.messages);
        }
        else {
          set_error(data?.message)
        }
      }
      catch (error) {
        set_error(error?.message)
      }
      finally {
        set_is_loading(false)
      }
    };

    useEffect(() => {
      set_messages([]);
      const receiver = active_chat.members.filter(e=> e._id !== user?._id)[0]
      set_receiver(receiver);
      
      if(!active_chat?._id) return
        fetch_messages();
    },[active_chat?._id]);
    
    
    useEffect(() => {
      if(!socket || !active_chat?._id) return;

      socket?.emit('join_room',active_chat?._id);
      update_message_status(socket,active_chat?._id,receiver?._id,'READ');

      socket?.on('send_message',chat => {

        if(chat?.last_message?.sender !== user?._id) {
          set_messages(prev=> [...prev,chat?.last_message]);
          update_message_status(socket,active_chat?._id,receiver?._id,'READ');
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
      
  },[socket,active_chat]);


  return (
    <div className="text-[#f7f8fa] flex-1 hide_model">
        <div className=" h-screen max-h-full flex flex-col hide_model">
          <Chat_header receiver={receiver} />
          <div className="flex-1 overflow-y-auto space-y-2 p-4 bg-[#111b21] bg-opacity-60 bg-chat-pattern hide_model">
             <>
              {
                  is_loading ? 
                    <Loading_component />
                    : messages?.map(message => (
                      <Message_card 
                        key={message?._id} 
                        message={message} 
                        user_id={user?._id}
                      />
                  ))
                }
                <div className="w-full h-[2px]">
                   
                </div>
             </>  
                
            </div>
            <Message_input set_messages={set_messages} contact_id={receiver?._id}/>
        </div> 
    </div>
  );
};

export default Active_chat;