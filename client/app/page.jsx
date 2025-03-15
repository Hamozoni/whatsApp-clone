'use client'
import { User_context } from '@/components/context';
import Chat_window from '@/components/chat_window/chat_window';
import { Loading } from '@/components/loading';
import Sidebar from '@/components/sidebar/sidebar';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Home() {


  const { user,is_loading } = useContext(User_context);


  useEffect(()=> {
    if(!user && !is_loading) {
      redirect('/signin');
    }
  },[user,is_loading]);

  if(is_loading) {
    return (
      <Loading />
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