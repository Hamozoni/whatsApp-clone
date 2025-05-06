import { Chats } from '../components/chat/chats';
import {Calls} from '../components/call/calls'
import { Chat_window } from '../components/chat_window/chat_window';
import { No_active_chat } from '../components/chat_window/No_active_chat';
import { Group } from '../components/group/group';
import { Navbar } from '../components/navbar/navbar';
import { Profile } from '../components/profile/profile';
import { Setting } from '../components/setting/setting';
import { Status } from '../components/status/status';
import { Chat_window_context } from '../contexts/chat_window.context';
import { User_context } from '../contexts/user.context';
import { useContext } from 'react';
import '../tailwind.css'

export default function Home() {

  const {active_navbar} = useContext(User_context);
  const {active_chat} = useContext(Chat_window_context);

  return (

      <div className="md:flex h-dvh max-h-dvh w-dvw max-w-dvw">
        <Navbar />
        <div className="w-full bg-[#111b21] text-[#f7f8fa] md:max-h-[calc(100dvh - 68px)]">
          {
            active_navbar === 'chats' ? 
            <div className="flex relative">
               <Chats />
               <div className={`${active_chat ? 'flex absolute z-20 left-0 top-0 w-full h-full max-w-full md:static md:left-auto md:top-auto' : 'hidden md:flex'} max-w-dvw flex-2`}>
                    {
                      active_chat ? 
                      <Chat_window /> :
                      <No_active_chat />
                    }
               </div>
            </div>
             : 
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