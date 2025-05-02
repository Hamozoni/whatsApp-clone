"use client";
import { Calls } from '@/components/call/calls';
import { Chats } from '@/components/chat/chats';
import { Group } from '@/components/group/group';
import { Navbar } from '@/components/navbar/navbar';
import { Profile } from '@/components/profile/profile';
import { Setting } from '@/components/setting/setting';
import { Status } from '@/components/status/status';
import { User_context } from '@/contexts/user.context';
import { useContext } from 'react';

export default function Home() {

  const {active_navbar} = useContext(User_context);

  return (
    
      <div className="md:flex h-dvh max-h-dvh w-screen hide_model">
        <Navbar />
        <div className="w-full bg-[#111b21] text-[#f7f8fa] md:max-h-[calc(100dvh - 68px)]">
          {
            active_navbar === 'chats' ? 
            <Chats /> : 
            active_navbar === 'calls' ? 
            <Calls /> : 
            active_navbar === 'status' ? 
            <Status /> :
            active_navbar === 'groups' ?
            <Group /> : 
            active_navbar === 'settings' ?
            <Setting /> :
            <Profile />
          }

        </div>
      </div>
  );
}