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

const settingButtons = [
    {name: 'acount', Icon: BsKey, info: 'Security notifications, acount info' },
    {name: 'privacy', Icon: MdOutlinePrivacyTip, info: 'Blocked contacts, disappearing messages' },
    {name: 'chats', Icon: MdOutlineChat, info: 'Theme, wallpaper, chat settings' },
    {name: 'notifications', Icon: MdNotificationsNone, info: 'Messages notifications' },
    {name: 'keyboard shortcuts', Icon: MdOutlineKeyboard, info: 'Quick actions' },
    {name: 'help', Icon: MdOutlineHelpOutline, info: 'Help center, contact us, privacy policy' },
]

export const Setting = ()=> {

    const [text,setText] = useState('')

    const {user,set_user} = useContext(User_context);

    const logOut = async ()=> {
       await signOut(firebase_auth);
       set_user(null)
    };

    return (
        <div className="flex h-dvh">
            <div className="p-3 flex-1 border-r border-cyan-950 flex flex-col min-w-[350px] md:max-w-[380px] ">
                {/* Header */}
                <header className='border-b border-b-black mb-4'>
                    <h5 className="text-xl font-bold mb-4">Settings</h5>
                    <SearchInput handleSearch={()=> ''} text={text} setText={setText} />
                    <div className="flex gap-2 my-4 cursor-pointer p-3 rounded-full hover:bg-cyan-950">
                         <Avatar size='lg' user_photo={user.profile_picture} />
                         <div className="">
                            <h5>{user?.name}</h5>
                            <span className='text-sm line-clamp-1 text-gray-400'>
                                {user?.about || 'active'}
                            </span>
                         </div>
                    </div>
                </header>
                {/* buttons */}
                <div className="flex-1 max-h-full overflow-y-auto">
                    {
                        settingButtons?.map(({name,info,Icon})=> (
                            <button key={name} className='flex gap-3 items-center my-3 p-3 rounded-full  hover:bg-cyan-950 w-full'>
                                <Icon size={28}/>
                                <div className="flex-1 text-start">
                                    <h6 className='capitalize'>{name}</h6>
                                    <span className='text-xs line-clamp-1 text-gray-400'>{info}</span>
                                </div>
                            </button>
                        ))
                    }
                    <button onClick={logOut} className='flex text-red-400 gap-3 items-center my-3 p-3 rounded-full hover:bg-cyan-950 w-full'>
                        <PiSignOutLight size={28} />
                        <h6>Log out</h6>
                    </button>
                </div>

            </div>
            <div className="hidden md:flex flex-2 items-center justify-center flex-col gap-5">
                <IoSettingsOutline size={48} />
                <h6 className='text-3xl'>Settings</h6>
            </div>
        </div>
    )
}