
"use client"
import React, { useState } from 'react';
import Options_icons from './options_icons';
import Chat_list from './chat_list';
import { Setting } from './setting';



const Sidebar = () => {

  const [active_option,set_active_option] = useState('chats');


  return (
    <section className='flex w-[450px] h-screen max-h-full hide_model'>
       <Options_icons 
          active_option={active_option}
          set_active_option={set_active_option}
        />
        <section className="grow bg-[#111b21] text-[#f7f8fa] border-x-1 border-[#394b55] h-screen max-h-screen hide_model">
          {
            active_option === 'chats' ? 
            <Chat_list /> :
            active_option === 'settings' ? 
            <Setting /> : ''
          }
        </section>
    </section> 
  );
};

export default Sidebar;


