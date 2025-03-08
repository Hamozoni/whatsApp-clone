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
            <div className="">
                <Icon/>
            </div>
        )
    }
    return (
        <section className="">
            <section className="">
                {
                    options?.map(({Icon,text})=> (
                        <Option Icon={Icon} text={text} key={text} />
                    ))
                }
            </section >
            <section className="">
                <Option Icon={IoIosStarOutline} text='starred messages' />
                <Option Icon={BsArchive} text='archived chats' />
            </section>
            <section className="">
                <Option Icon={IoSettingsOutline} text='settings' />
                <div className="">
                    <Image src={user_photo} width={40} height={40} alt="user photo" />
                </div>
            </section>
        </section>
    )
}