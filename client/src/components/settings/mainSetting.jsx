import { useContext } from 'react';
import {firebaseAuth} from '../../lib/firebaseConfig'
import { signOut } from 'firebase/auth';
import { UserContext } from '../../contexts/user.context';
import { useState } from "react";
import { SearchInput } from "../ui/searchInput";
import { Avatar } from "../ui/avatar";

import { BsKey } from "react-icons/bs";
import { PiSignOutLight } from "react-icons/pi";

import { 
        MdOutlinePrivacyTip,
        MdOutlineChat,
        MdNotificationsNone,
        MdOutlineKeyboard,
        MdOutlineHelpOutline,
        MdOutlineWbSunny
     } from "react-icons/md";

const settingButtons = [
    {name: 'account', Icon: BsKey, info: 'Security notifications, acount info' },
    {name: 'privacy', Icon: MdOutlinePrivacyTip, info: 'Blocked contacts, disappearing messages' },
    {name: 'chats', Icon: MdOutlineChat, info: 'Theme, wallpaper, chat settings' },
    {name: 'notifications', Icon: MdNotificationsNone, info: 'Messages notifications' },
    {name: 'keyboard shortcuts', Icon: MdOutlineKeyboard, info: 'Quick actions' },
    {name: 'help', Icon: MdOutlineHelpOutline, info: 'Help center, contact us, privacy policy' },
]

export const MainSetting = ({setActivePage})=> {

    const [text,setText] = useState('')

    const {user,set_user} = useContext(UserContext);

    const logOut = async ()=> {
       await signOut(firebaseAuth);
       set_user(null)
    };

    return (
        <>
            {/* Header */}
            <header className='p-3'>
                <h5 className="text-lg font-bold mb-4">Settings</h5>
                <SearchInput handleSearch={()=> ''} text={text} setText={setText} />
            </header>
            {/* buttons */}
            <div className="flex-1 max-h-full overflow-y-auto p-3">
                <div className="border-b border-b-[#213036] mb-3">
                    <button 
                        onClick={()=> setActivePage('profile')} 
                        className="flex items-center w-full gap-2 my-4 cursor-pointer p-3 rounded-lg border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31]"
                        >
                        <Avatar size='lg' user_photo={user.profile_picture} />
                        <div className="flex-1 text-start">
                            <h6 className='capitalize'>{user?.name}</h6>
                            <span  className='text-xs line-clamp-1 text-gray-400'>
                                {user?.about || 'active'}
                            </span>
                        </div>
                    </button>

                </div>
                {
                    settingButtons?.map(({name,info,Icon})=> (
                        <button 
                            onClick={()=> setActivePage(name)}
                            key={name} 
                            className='flex gap-3 items-center px-3 rounded-lg border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31] w-full'>
                            <Icon size={24}/>
                            <div className="flex-1 text-start py-3 border-b border-b-[#3b535c]">
                                <h6 className='capitalize'>{name}</h6>
                                <span className='text-xs line-clamp-1 text-gray-400'>{info}</span>
                            </div>
                        </button>
                    ))
                }
                <button 
                    onClick={logOut} 
                    className='flex text-red-400 gap-3 items-center my-3 p-3 rounded-lg border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31] w-full'>
                    <PiSignOutLight size={24} />
                    <h6>Log out</h6>
                </button>
            </div>
        </>
    )
}