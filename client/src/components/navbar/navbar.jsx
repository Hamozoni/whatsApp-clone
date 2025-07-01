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
                        className={`border-2 rounded-full ${activeNavbar === 'profile' ? 'border-emerald-400' : 'border-transparent'}`}
                        onClick={()=> setActiveNavbar('profile')}>
                        <Avatar  userPhoto={user?.profile_picture} />
                    </button>
                </section>
            </section>
        </nav>
    )
}