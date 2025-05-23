import { BsChatText } from "react-icons/bs";
import { IoCallOutline,IoSettingsOutline } from "react-icons/io5";
import { SiGradleplaypublisher } from "react-icons/si";
import { MdOutlineGroups2 } from "react-icons/md";
import { useContext } from "react";
import { User_context } from "../../contexts/user.context";
import { NavbarIcon } from "./navbarIcon";
import { Avatar } from "../ui/avatar";

const options = [
    {Icon: BsChatText,text: 'chats'},
    {Icon: IoCallOutline,text: 'calls'},
    {Icon: SiGradleplaypublisher,text: 'status'},
    {Icon: MdOutlineGroups2,text: 'groups'},
]

export const Navbar = ()=>  {

    const {user} = useContext(User_context);

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
                <section className="flex flex-col gap-3" >
                    <NavbarIcon Icon={IoSettingsOutline} text='settings' />
                    <Avatar  user_photo={user?.profile_picture} />
                </section>
            </section>
        </nav>
    )
}