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
    
      <div className="flex h-screen max-h-screen w-screen hide_model">
        <Navbar />
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
  );
}