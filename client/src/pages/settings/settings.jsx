import { useState } from "react";

import {IoSettingsOutline } from "react-icons/io5";
import { Account } from './components/account';
import { Privacy } from './components/privacy';
import { MainSetting } from './components/mainSetting';
import { Chats } from './components/chats';
import { Notifications } from "./components/notifications";
import { Help } from "./components/help";
import { KeyboardShorts } from "./components/keyboardShorts";
import { Profile } from "./profile";
import { Theme } from "./components/theme";
import { CloseModel } from "../../components/modal/closeModel";


export const Settings = ()=> {

    const [activePage,setActivePage] = useState('main');

    return (
        <div  className="flex gap-1 h-full flex-1 overflow-y-auto">
             {
                 activePage === 'keyboard shortcuts' &&
                 <>
                    <KeyboardShorts setActivePage={setActivePage} />
                    <CloseModel setCloseModel={setActivePage} />
                 </>
             }
            <div className="flex-1 flex flex-col w-full min-w-[380px] md:w-[380px] max-w-full rounded-lg bg-p ">
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
                    activePage === 'theme'?
                    <Theme setActivePage={setActivePage}/>:
                    <MainSetting setActivePage={setActivePage}/>

                }
            </div>
            <section className="hidden md:flex text-gray-400 flex-2 items-center justify-center flex-col gap-5 bg-s rounded-lg">
                <IoSettingsOutline size={48} />
                <h6 className='text-3xl'>Settings</h6>
            </section>
        </div>
    )
}