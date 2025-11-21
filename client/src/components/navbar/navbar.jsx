import { BsChatText } from "react-icons/bs";
import { IoCallOutline,IoSettingsOutline } from "react-icons/io5";
import { SiGradleplaypublisher } from "react-icons/si";
import { GrChannel } from "react-icons/gr";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { NavbarIcon } from "./navbarIcon";
import { Avatar } from "../ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";

const options = [
    {Icon: BsChatText,text: 'chats'},
    {Icon: IoCallOutline,text: 'calls'},
    {Icon: SiGradleplaypublisher,text: 'status'},
    {Icon: GrChannel,text: 'channels'},
]

export const Navbar = ()=>  {

    const {user} = useContext(UserContext);

    const {pathname} = useLocation();
    const navigate = useNavigate();

    if(!user){
        return;
    }


    return (
        <nav className="flex md:flex-col gap-3 h-fit md:h-screen justify-between items-center p-2 bg-[#162127] rounded-lg" >
            <div className="flex md:flex-col gap-3">
                {
                    options?.map(({Icon,text})=> (
                        <NavbarIcon 
                            key={text} 
                            Icon={Icon} 
                            text={text} 
                                />
                    ))
                }
            </div >
            <div className="flex md:flex-col gap-3 justify-center items-center" >
                <NavbarIcon 
                    Icon={IoSettingsOutline} 
                    text='settings' 
                    />
                <button   className={` ${pathname === '/profile' ?  'text-emerald-400' :'text-[#f7f8fa]'} flex flex-col items-center justify-center`}>
                    <div 
                        onClick={()=> navigate('/profile')}>
                        <Avatar  userPhoto={user?.photoURL} />
                    </div>
                </button>
            </div>
        </nav>
    )
}