'use client'
import { User_context } from '@/component/context';
import Chat_window from '@/component/chat_window/chat_window';
import Sidebar from '@/component/sidebar/sidebar';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { Loading_component } from '@/component/loading_component';

export default function Home() {


  const { user,is_loading } = useContext(User_context);


  useEffect(()=> {
    if(!user && !is_loading) {
      redirect('/signin');
    }
  },[user,is_loading]);

  if(is_loading) {
    return (
      <Loading_component />
    )
  }

  return (
    <main>
        <div className="flex h-screen max-h-screen w-screen">
            <Sidebar user={user} />
            <Chat_window />
        </div>
    </main>
  );
}