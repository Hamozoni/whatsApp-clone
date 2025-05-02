import { BsChatText,BsArchive } from "react-icons/bs";
import { IoCallOutline,IoSettingsOutline } from "react-icons/io5";
import { SiGradleplaypublisher } from "react-icons/si";
import { MdOutlineGroups2 } from "react-icons/md";
import { IoIosStarOutline } from "react-icons/io";
import { useContext } from "react";
import { User_context } from "../../contexts/user.context";
import { Navbar_icon } from "./navbar_icon";

const options = [
    {Icon: BsChatText,text: 'chats'},
    {Icon: IoCallOutline,text: 'calls'},
    {Icon: SiGradleplaypublisher,text: 'status'},
    {Icon: MdOutlineGroups2,text: 'groups'},
]

export const Navbar = ()=>  {

    const {user} = useContext(User_context);

    return (
        <nav className=" flex flex-col justify-between items-center px-2 py-4  bg-[#222e35]" >
            <section className="flex flex-col gap-2">
                {
                    options?.map(({Icon,text})=> (
                        <Navbar_icon 
                            Icon={Icon} 
                            text={text} 
                            key={text}
                             />
                    ))
                }
            </section >
            <section>
                <section className="flex flex-col gap-2">
                    <Navbar_icon 
                        Icon={IoIosStarOutline} 
                        text='starred messages' 
                        />
                    <Navbar_icon 
                        Icon={BsArchive} 
                        text='archived chats' 
                        />
                </section>
                <hr className="text-[#394b55] my-5" />
                <section className="flex flex-col gap-3" >
                    <Navbar_icon Icon={IoSettingsOutline} text='settings' />
                    {/* <Navbar_icon user_photo={user?.profile_picture} /> */}
                </section>
            </section>
        </nav>
    )
}