import { useContext } from "react";
import { User_context } from "../context";


export const Chat_card = ({chat})=> {

    const {user,active_chat,set_active_chat} = useContext(User_context);

    const sender = chat?.members?.filter(e=> e?._id !== user?._id)[0];


    return (
        <div
            onClick={() => set_active_chat(chat)}
            className={`flex items-center cursor-pointer px-3 hover:bg-[#31414b] ${
                active_chat?.id === chat.id ? 'bg-[#222e35]' : '' }`}
            >
            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={sender?.profile_picture} alt={sender.name} className="w-full h-full object-cover" />
                </div>
                {
                    chat?.is_online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-800  rounded-full border-2 border-white"></div>
                    )
                }
            </div>
            <div className="ml-4 flex-1 py-3 min-w-0 border-b-1 border-[#222e35] text-[#f7f8fa]">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold truncate">{sender.name}</h2>
                    <span className="text-xs text-[#667781]">{chat?.last_message?.createdAt}</span>
                </div>
                <div className="flex justify-between items-center">
                     <p className="text-sm text-[#667781] truncate">{chat?.last_message?.text}</p> 
                     {/* {chat.unread > 0 && (
                        <span className="bg-emerald-800  text-white rounded-full px-2 py-1 text-xs min-w-[20px] text-center">
                        {chat.unread}
                        </span>
                     )} */}
                </div>
            </div>
        </div>
    )
}