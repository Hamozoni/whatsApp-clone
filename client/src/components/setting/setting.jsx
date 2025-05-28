import { useState } from "react";

import {IoSettingsOutline } from "react-icons/io5";
import { Account } from './account';
import { Privacy } from './privacy';
import { MainSetting } from './mainSetting';
import { Chats } from './chats';
import { Notifications } from "./notifications";
import { Help } from "./help";
import { KeyboardShorts } from "./keyboardShorts";


export const Setting = ()=> {

    const [activePage,setActivePage] = useState('main')

    return (
        <div className="flex h-dvh">
            <div className="p-3 flex-1 border-r border-r-gray-800 flex flex-col min-w-[350px] md:max-w-[380px] ">
                {
                    activePage === 'main' ? 
                    <MainSetting setActivePage={setActivePage}/>:
                    activePage === 'account' ?
                    <Account setActivePage={setActivePage} /> : 
                    activePage === 'privacy' ?
                    <Privacy setActivePage={setActivePage} /> :
                    activePage === 'chats' ?
                    <Chats setActivePage={setActivePage}/> :
                     activePage === 'notifications' ?
                    <Notifications setActivePage={setActivePage}/> :
                     activePage === 'help' ?
                    <Help setActivePage={setActivePage} />:
                    <KeyboardShorts />
                }
            </div>
            <div className="hidden md:flex flex-2 items-center justify-center flex-col gap-5">
                <IoSettingsOutline size={48} />
                <h6 className='text-3xl'>Settings</h6>
            </div>
        </div>
    )
}