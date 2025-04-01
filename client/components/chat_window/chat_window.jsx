
"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chat_header } from './chat_header';
import { Message_input } from './message_input';
import { User_context } from '../../contexts/context';
import Image from 'next/image';
import axios from 'axios';
import { Message_card } from './message_card';
import { Loading_component } from '../ui/loading_component';
import { useSocket } from '@/hooks/useSocket';

const Chat_window = () => {
  
  
    const {user,active_chat} = useContext(User_context);
    const [messages, set_messages] = useState([]);
    const [receiver, set_receiver] = useState(null);
    const [is_loading, set_is_loading] = useState(false);
    const [error, set_error] = useState(null);
    const socket = useSocket();
  

    const update_status = async ()=> {
      try {
        const body = {
          chat_id: active_chat?._id,
          sender: receiver?._id,
          status : 'READ'
        };
  
        const {data} =  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/message`,body);
        if(!data?.status) return;

        set_messages(data?.messages)
  
        const socket_data = {
          messages: data?.messages,
          chat_id: active_chat?._id
        }
        socket.emit('messag_read',socket_data);

      }
      catch (error) {
        set_error(error?.message)
      }
 
    };


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
    }

    useEffect(() => {
      set_messages([]);
      set_receiver(active_chat?.members?.filter(e=> e._id !== user?._id)[0]);

      if(active_chat?._id) {
        fetch_messages()
        update_status();
      }
    },[active_chat]);
    
    
    useEffect(() => {
      if(!socket || !active_chat?._id )  return;
      console.log(socket);
      socket.emit('join_room',active_chat?._id);
      socket.on('message_sent',chat => {
        set_messages(prev=> [...prev,chat?.last_message]);
        update_status();
      });

      socket.on('message_seen', (messages) => {
        set_messages(messages)
     });


      return ()=> {
        socket.off('message_sent');
        socket.off('message_seen');
      }
      
  },[socket,active_chat]);


  return (
    <div className="text-[#f7f8fa] flex-1 hide_model">
      {
        active_chat ?
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
            <Message_input contact_id={receiver?._id}/>
        </div> 
        : 
        <div className=" h-screen max-h-full flex items-center justify-center bg-[#222e35] hide_model">
          <div className="flex flex-col justify-center items-center hide_model">
              <Image src={'/chat_window.png'} width={300} height={300} alt='chat window' />
              <div className="text-center mt-6 max-w-[500px] hide_model">
                   <h4 className='text-3xl font-light hide_model'>download WhatsApp for Windows</h4>
                   <p className='text-center text-sm font-light mt-4 hide_model'>Make calls, share your screen and get a faster experience when you download the Windows app.</p>
              </div>
          </div>
        </div>

      }

    </div>
  );
};

export default Chat_window;