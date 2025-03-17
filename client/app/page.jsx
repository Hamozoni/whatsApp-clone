"use client"
import { User_context } from '@/component/context';
import Chat_window from '@/component/chat_window/chat_window';
import Sidebar from '@/component/sidebar/sidebar';
import { useContext } from 'react';

export default function Home() {


  const { user} = useContext(User_context);




  return (
    <main>
        <div className="flex h-screen max-h-screen w-screen">
            <Sidebar user={user} />
            <Chat_window />
        </div>
    </main>
  );
}