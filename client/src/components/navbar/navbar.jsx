import { BsChatText } from "react-icons/bs";
import { IoCallOutline,IoSettingsOutline } from "react-icons/io5";
import { SiGradleplaypublisher } from "react-icons/si";
import { GrChannel } from "react-icons/gr";
import { useContext } from "react";
import { User_context } from "../../contexts/user.context";
import { NavbarIcon } from "./navbarIcon";
import { Avatar } from "../ui/avatar";

const options = [
    {Icon: BsChatText,text: 'chats'},
    {Icon: IoCallOutline,text: 'calls'},
    {Icon: SiGradleplaypublisher,text: 'status'},
    {Icon: GrChannel,text: 'channels'},
]

export const Navbar = ()=>  {

    const {user,active_navbar,set_active_navbar} = useContext(User_context);

    return (
        <nav className=" flex md:flex-col justify-between items-center md:px-2 md:py-4 py-2 px-3 bg-[#162127]" >
            <section className="flex md:flex-col gap-2">
                {
                    options?.map(({Icon,text})=> (
                        <NavbarIcon 
                            Icon={Icon} 
                            text={text} 
                            key={text}
                             />
                    ))
                }
            </section >
            <section>
                <hr className="text-[#394b55] my-5 hidden md:visible" />
                <section className="flex md:flex-col gap-3 justify-center items-center" >
                    <NavbarIcon Icon={IoSettingsOutline} text='settings' />
                    <button 
                        className={`border-2 rounded-full ${active_navbar === 'profile' ? 'border-emerald-400' : 'border-transparent'}`}
                        onClick={()=> set_active_navbar('profile')}>
                        <Avatar  user_photo={user?.profile_picture} />
                    </button>
                </section>
            </section>
        </nav>
    )
}