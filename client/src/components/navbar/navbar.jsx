import { BsChatText } from "react-icons/bs";
import { IoCallOutline,IoSettingsOutline } from "react-icons/io5";
import { SiGradleplaypublisher } from "react-icons/si";
import { GrChannel } from "react-icons/gr";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { NavbarIcon } from "./navbarIcon";
import { Avatar } from "../ui/avatar";

const options = [
    {Icon: BsChatText,text: 'chats'},
    {Icon: IoCallOutline,text: 'calls'},
    {Icon: SiGradleplaypublisher,text: 'status'},
    {Icon: GrChannel,text: 'channels'},
]

export const Navbar = ()=>  {

    const {user,activeNavbar,setActiveNavbar} = useContext(UserContext);


    return (
        <nav className="flex md:flex-col justify-between items-center md:px-2 md:py-4 p-1 bg-[#162127] m-1 rounded-lg" >
            <div className="flex md:flex-col gap-2">
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
                <button   className={` ${activeNavbar === 'profile' ?  'text-emerald-400' :'text-[#f7f8fa]'} flex flex-col items-center justify-center`}>
                    <div 
                        onClick={()=> setActiveNavbar('profile')}>
                        <Avatar  userPhoto={user?.profile_picture} />
                    </div>
                    <span className=" md:hidden">profile</span>
                </button>
                <NavbarIcon 
                    Icon={IoSettingsOutline} 
                    text='settings' 
                    />
            </div>
        </nav>
    )
}