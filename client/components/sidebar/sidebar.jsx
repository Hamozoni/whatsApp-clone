"use client"
import React, { useState } from 'react';
import Options_icons from './options_icons';
import Chat_list from './chat_list';

const Sidebar = ({user}) => {

  const [active_option,set_active_option] = useState('chats');

  return (
    <section className='flex w-[400px] h-screen max-h-full'>
       <Options_icons 
         user_photo={user?.photoURL}
          active_option={active_option}
          set_active_option={set_active_option}
        />
        <div className="">
          <Chat_list />
        </div>
    </section>
  );
};

export default Sidebar;
