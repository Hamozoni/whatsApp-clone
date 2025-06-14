import { useState } from "react";

import {IoSettingsOutline } from "react-icons/io5";
import { Account } from '../components/settings/account';
import { Privacy } from '../components/settings/privacy';
import { MainSetting } from '../components/settings/mainSetting';
import { Chats } from '../components/settings/chats';
import { Notifications } from "../components/settings/notifications";
import { Help } from "../components/settings/help";
import { KeyboardShorts } from "../components/settings/keyboardShorts";
import { Close_model } from "../components/ui/close_model";
import { Profile } from "./profile";


export const Settings = ()=> {

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
            <div className="flex-1 flex flex-col border-r border-r-[#213036] w-full min-w-[380px] md:w-[380px] max-w-full ">
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