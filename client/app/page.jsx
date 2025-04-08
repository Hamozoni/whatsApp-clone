"use client";
import { Chat_window } from '@/components/chat_window/chat_window';
import { No_active_chat } from '@/components/chat_window/No_active_chat';
import Sidebar from '@/components/sidebar/sidebar';
import { User_context } from '@/contexts/user.context';
import { useContext } from 'react';

export default function Home() {

    
  const {active_chat} = useContext(User_context);

  return (
    <main>
        <div className="flex h-screen max-h-screen w-screen hide_model">
            <Sidebar />
            {
              active_chat ? 
              <Chat_window />
              : <No_active_chat />
            }
        </div>
    </main>
  );
}