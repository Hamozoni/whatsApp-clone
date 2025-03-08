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
            <div className="flex justify-center items-center px-3 py-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                <Icon size={22} className='text-[#f7f8fa]'/>
            </div>
        )
    }
    return (
        <section className=" flex flex-col gap-1 justify-between items-center p-2 bg-[#222e35]" >
            <section className="">
                {
                    options?.map(({Icon,text})=> (
                        <Option Icon={Icon} text={text} key={text} />
                    ))
                }
            </section >
            <section>

                <div className="">
                    <Option Icon={IoIosStarOutline} text='starred messages' />
                    <Option Icon={BsArchive} text='archived chats' />
                </div>
                <div className="">
                    <Option Icon={IoSettingsOutline} text='settings' />
                    <div className="cursor-pointer">
                        <Image src={user_photo || 'https://via.placeholder.com/150'} width={40} height={40} alt="user photo" className="rounded-full" />
                    </div>
                </div>
            </section>
        </section>
    )
}