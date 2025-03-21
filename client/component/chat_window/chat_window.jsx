
"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Chat_header } from './chat_header';
import { Message_input } from './message_input';
import { User_context } from '../context';
import Image from 'next/image';
import axios from 'axios';
import { Message_card } from './message_card';


const Chat_window = () => {

    const {user,active_chat} = useContext(User_context);
    const [messages, set_messages] = useState([]);
    const [receiver, set_receiver] = useState(null);
    
    useEffect(() => {

      set_receiver(active_chat?.members?.filter(e=> e.id !== user?.id)[0]);

      const fetch_messages = async ()=> {
        try{
  
          const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/message?chat_id=${active_chat?._id}`);
  
          console.log(data);
  
          set_messages(data?.messages)
        }
        catch (error) {
  
        }

      };

      if(active_chat?._id) {
        fetch_messages();
      }else {
        set_messages([])
      }


    },[active_chat]);


  return (
    <div className="text-[#f7f8fa] flex-1 hide_model">
      {
        active_chat ?
        <div className=" h-screen max-h-full flex flex-col hide_model">
          <Chat_header receiver={receiver} />
          <div className="flex-1 overflow-y-auto p-4 bg-[#111b21] bg-opacity-60 bg-chat-pattern hide_model">
              <div className="space-y-2 text-[#f7f8fa]">
                {
                  messages.map(message => (
                    <Message_card 
                      key={message?._id} 
                      message={message} 
                      user_id={user?._id}
                    />
                ))}
              </div>
            </div>
            <Message_input receiver={receiver?._id}/>
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