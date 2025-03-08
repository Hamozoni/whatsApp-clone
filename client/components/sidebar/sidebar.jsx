"use client"
import React, { useState } from 'react';
import Options_icons from './options_icons';
import Chat_list from './chat_list';

const Sidebar = () => {

  const [active_option,set_active_option] = useState('chats');

  return (
    <section className='flex flex-1/4]'>
       <Options_icons 
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
