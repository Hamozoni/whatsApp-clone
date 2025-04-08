"use client";
import Active_chat from '@/components/chat_window/active_chat';
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
              <Active_chat />
              : <No_active_chat />
            }
        </div>
    </main>
  );
}