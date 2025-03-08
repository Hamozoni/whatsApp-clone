import { GoSearch } from "react-icons/go"
import { HiOutlineDotsVertical } from "react-icons/hi"


export const Chat_header = ()=> {
    return (
        <div className="p-3 bg-[#222e35] text-[#f7f8fa] flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/whatsapp_bg.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="ml-4 flex-1">
                <h2 className="font-semibold text-[#f7f8fa]">
                {/* {chats.find(chat => chat.id === activeChat)?.name} */}
                    Mohamed Yahia
                </h2>
                <p className="text-sm font-light text-[#f7f8fa]">
                {true ? 'online' : 'offline'}
                </p>
            </div>
            <div className="flex space-x-4">
                <GoSearch className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#afb3b9] " />
                <HiOutlineDotsVertical className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#bcc0c7]" />
            </div>
        </div>
    )
}