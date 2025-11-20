import { useContext } from 'react';
import {auth} from '../../../lib'
import { signOut } from 'firebase/auth';
import { UserContext } from '../../../contexts/index.js';
import { useState } from "react";
import { SearchInput } from "../../../components/ui/searchInput.jsx";
import { Avatar } from "../../../components/ui/avatar";

import { BsKey } from "react-icons/bs";
import { PiSignOutLight } from "react-icons/pi";

import { 
        MdOutlinePrivacyTip,
        MdOutlineChat,
        MdNotificationsNone,
        MdOutlineKeyboard,
        MdOutlineHelpOutline,
     } from "react-icons/md";
import { Link } from 'react-router-dom';

const settingButtons = [
    {name: 'account', Icon: BsKey, info: 'Security notifications, acount info' },
    {name: 'privacy', Icon: MdOutlinePrivacyTip, info: 'Blocked contacts, disappearing messages' },
    {name: 'chats', Icon: MdOutlineChat, info: 'Theme, wallpaper, chat settings' },
    {name: 'notifications', Icon: MdNotificationsNone, info: 'Messages notifications' },
    {name: 'keyboard shortcuts', Icon: MdOutlineKeyboard, info: 'Quick actions' },
    {name: 'help', Icon: MdOutlineHelpOutline, info: 'Help center, contact us, privacy policy' },
]

const MainSetting = ()=> {

    const [text,setText] = useState('');
    const [Loading,setLoading] = useState(false);
    const [error,setError] = useState(null);


    const {user} = useContext(UserContext);

    const logOut = async ()=> {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
        }
        catch (err) {
           setError(err)
        }
        finally {
            setLoading(false)
        }
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
                    <Link 
                        to='profile'
                        className="flex items-center w-full gap-2 my-4 cursor-pointer p-3 rounded-lg border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31]"
                        >
                        <Avatar size='lg' userPhoto={user?.photoURL} />
                        <div className="flex-1 text-start">
                            <h6 className='capitalize'>{user?.displyName}</h6>
                            <span  className='text-xs line-clamp-1 text-gray-400'>
                                {user?.about || 'active'}
                            </span>
                        </div>
                    </Link>

                </div>
                {
                    settingButtons?.map(({name,info,Icon})=> (
                        <Link 
                            to={name}
                            key={name} 
                            className='flex gap-3 items-center px-3 rounded-lg border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31] w-full'>
                            <Icon size={24}/>
                            <div className="flex-1 text-start py-3 border-b border-b-[#3b535c]">
                                <h6 className='capitalize'>{name}</h6>
                                <span className='text-xs line-clamp-1 text-gray-400'>{info}</span>
                            </div>
                        </Link>
                    ))
                }
                <button 
                    onClick={logOut} 
                    className='flex text-red-400 gap-3 items-center my-3 p-3 rounded-lg border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31] w-full'>
                    <PiSignOutLight size={24} />
                    <h6>{Loading ? 'logging out...' : 'Log out'}</h6>
                </button>
            </div>
        </>
    )
};

export default MainSetting;