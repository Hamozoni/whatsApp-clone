'use client'
import { Auth_context } from '@/components/auth/context';
import Chat_window from '@/components/chat_window/chat_window';
import { Loading } from '@/components/loading';
import Sidebar from '@/components/sidebar/sidebar';
import {firebase_auth} from '@/lib/firebase_config'
import { signOut } from 'firebase/auth';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Home() {


  const { user,isLoading } = useContext(Auth_context);


  useEffect(()=> {
    if(!user && !isLoading) {
      redirect('/signin');
    }
  },[user,isLoading]);

  if(isLoading) {
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