"use client";
import { Chat_window } from '@/components/chat_window/chat_window';
import { No_active_chat } from '@/components/chat_window/No_active_chat';
import Sidebar from '@/components/sidebar/sidebar';
import { Socket } from '@/components/socket/socket';
import { Chat_window_context } from '@/contexts/chat_window.context';
import { useContext } from 'react';

export default function Home() {

    
  const {active_chat} = useContext(Chat_window_context);

  return (
    <>
      <Socket chat_id={active_chat?._id} />
      <div className="flex h-screen max-h-screen w-screen hide_model">
          <Sidebar />
          {
            active_chat ? 
            <Chat_window />
            : <No_active_chat />
          }
      </div>
    </>
  );
}