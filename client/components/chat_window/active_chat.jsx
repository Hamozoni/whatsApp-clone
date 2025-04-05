
"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Chat_header } from './chat_header';
import { Message_input } from './message_input';
import { User_context } from '../../contexts/context';
import axios from 'axios';
import { Message_card } from './message_card';
import { Loading_component } from '../ui/loading_component';
import { useSocket } from '@/hooks/useSocket';

const Active_chat = () => {

    
  const {user,active_chat} = useContext(User_context);
  
    const [messages, set_messages] = useState([]);
    const [status, set_status] = useState('SENT');
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
        // read_messages();

    },[active_chat?._id]);
    
    
    useEffect(() => {
      if(!active_chat?._id )  return;

      socket?.emit('join_room',active_chat?._id)
      socket?.on('message_sent',chat => {
        set_messages(prev=> [...prev,chat?.last_message]);
      });

      socket?.on('message_status_changed', data => {

        console.log('message_status_changed', data?.receiver !== user?._id,user?._id,data?.receiver )

        if(data?.receiver !== user?._id) {
          set_status(data?.status)
        };
      });

      return ()=> {
        socket?.off('message_sent');
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
                        status={status}
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
            <Message_input contact_id={receiver?._id}/>
        </div> 
    </div>
  );
};

export default Active_chat;