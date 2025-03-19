
import { GoSearch } from "react-icons/go"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoCallOutline,IoVideocamOutline  } from "react-icons/io5";


export const Chat_header = ({receiver})=> {


    return (
        <div className="p-3 bg-[#222e35] text-[#f7f8fa] flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={receiver?.profile_picture} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="ml-4 flex-1">
                <h2 className="font-semibold text-[#f7f8fa]">
                {/* {chats.find(chat => chat.id === activeChat)?.name} */}
                   {receiver?.name}
                </h2>
                <p className="text-sm font-light text-[#f7f8fa]">
                {receiver?.in_online ? 'online' : 'offline'}
                </p>
            </div>
            <div className="flex gap-5 items-center">
                <div className="flex items-center bg-[#394b55] rounded-md">
                    <button className="flex justify-center items-center p-2 rounded-md hover:bg-[#00a884] cursor-pointer">
                        <IoCallOutline size={18} className='text-[#f7f8fa]'/>
                    </button>
                    <div className="w-[1px] min-w[1px] h-[20px] min-h-[20px] bg-[#ffffff]">  </div>
                    <button className="flex justify-center items-center p-2 rounded-md hover:bg-[#00a884] cursor-pointer">
                        <IoVideocamOutline size={18} className='text-[#f7f8fa]'/>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <GoSearch className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#afb3b9] " />
                    <HiOutlineDotsVertical className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#bcc0c7]" />
                </div>
            </div>
        </div>
    )
}