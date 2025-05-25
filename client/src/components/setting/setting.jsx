import { useContext } from 'react';
import {firebase_auth} from '../../lib/firebase_config'
import { signOut } from 'firebase/auth';
import { User_context } from '../../contexts/user.context';
import { useState } from "react";
import { SearchInput } from "../ui/searchInput";
import { Avatar } from "../ui/avatar";

import {IoSettingsOutline } from "react-icons/io5";

import { BsKey } from "react-icons/bs";
import { PiSignOutLight } from "react-icons/pi";
import { MdOutlinePrivacyTip,MdOutlineChat,MdNotificationsNone,MdOutlineKeyboard,MdOutlineHelpOutline } from "react-icons/md";
import { Account } from './account';
import { Privacy } from './privacy';
import { MainSetting } from './mainSetting';


export const Setting = ()=> {

    const [activePage,setActivePage] = useState('main')

    return (
        <div className="flex h-dvh">
            <div className="p-3 flex-1 border-r border-cyan-950 flex flex-col min-w-[350px] md:max-w-[380px] ">
                {
                    activePage === 'main' ? 
                    <MainSetting setActivePage={setActivePage}/>:
                    activePage === 'account' ?
                    <Account setActivePage={setActivePage} /> : 
                    <Privacy setActivePage={setActivePage} />
                }
            </div>
            <div className="hidden md:flex flex-2 items-center justify-center flex-col gap-5">
                <IoSettingsOutline size={48} />
                <h6 className='text-3xl'>Settings</h6>
            </div>
        </div>
    )
}