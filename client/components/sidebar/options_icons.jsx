import { BsChatText,BsArchive } from "react-icons/bs";
import { IoCallOutline,IoSettingsOutline } from "react-icons/io5";
import { SiGradleplaypublisher } from "react-icons/si";
import { MdOutlineGroups2 } from "react-icons/md";
import { IoIosStarOutline } from "react-icons/io";

import Image from "next/image";

const options = [
    {Icon: BsChatText,text: 'chats'},
    {Icon: IoCallOutline,text: 'calls'},
    {Icon: SiGradleplaypublisher,text: 'status'},
    {Icon: MdOutlineGroups2,text: 'groups'},
]

export default function Options_icons ({user_photo,active_option,set_active_option}) {

    const Option = ({Icon,text})=> {
        return (
            <button 
                onClick={()=> set_active_option(text)} 
                className={`relative flex justify-center items-center px-3 py-2 rounded-md hover:bg-[#394b55] cursor-pointer ${active_option === text && 'bg-[#394b55]'}`}>
                <Icon size={20} className={`${active_option === text ? 'text-emerald-400' :'text-[#f7f8fa]'}`}/>
                {
                    active_option === text && <div className="absolute top-[6px] left-[-2px] w-[4px] h-[26px] bg-emerald-400 rounded-full"></div>
                }
                <div className=""></div>
            </button>
        )
    }
    return (
        <section className=" flex flex-col justify-between items-center px-2 py-4  bg-[#222e35]" >
            <section className="flex flex-col gap-2">
                {
                    options?.map(({Icon,text})=> (
                        <Option Icon={Icon} text={text} key={text} />
                    ))
                }
            </section >
            <section>

                <div className="mb-5 flex flex-col gap-2">
                    <Option Icon={IoIosStarOutline} text='starred messages' />
                    <Option Icon={BsArchive} text='archived chats' />
                </div>
                <hr className="text-[#394b55]" />
                <div className="mt-5">
                    <Option Icon={IoSettingsOutline} text='settings' />
                    <div className="cursor-pointer mt-3">
                        <Image src={user_photo || 'https://via.placeholder.com/150'} width={35} height={35} alt="user photo" className="rounded-full" />
                    </div>
                </div>
            </section>
        </section>
    )
}