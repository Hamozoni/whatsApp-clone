import { useState } from "react";

import {IoSettingsOutline } from "react-icons/io5";
import { Account } from './account';
import { Privacy } from './privacy';
import { MainSetting } from './mainSetting';
import { Chats } from './chats';
import { Notifications } from "./notifications";
import { Help } from "./help";
import { KeyboardShorts } from "./keyboardShorts";
import { Close_model } from "../ui/close_model";
import { Profile } from "../profile/profile";


export const Setting = ()=> {

    const [activePage,setActivePage] = useState('main')

    return (
        <div className="flex h-dvh">
             {
                 activePage === 'keyboard shortcuts' &&
                 <>
                 <KeyboardShorts setActivePage={setActivePage} />
                 <Close_model set_model={setActivePage} />
                 </>
             }
            <div className="p-3 flex-1 border-r border-r-gray-800 flex flex-col min-w-[350px] md:max-w-[380px] ">
                {
                    activePage === 'profile' ?
                    <Profile setActivePage={setActivePage} /> :
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
                    <MainSetting setActivePage={setActivePage}/>

                }
            </div>
            <div className="hidden md:flex flex-2 items-center justify-center flex-col gap-5">
                <IoSettingsOutline size={48} />
                <h6 className='text-3xl'>Settings</h6>
            </div>
        </div>
    )
}