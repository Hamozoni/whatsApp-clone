import { useContext,useState } from "react";
import { User_context } from "../../contexts/user.context.jsx";
import { ChatsContext } from "../../contexts/chats.context.jsx";
import { FaRegImage,FaMicrophone ,FaVideo } from "react-icons/fa6";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { CallNotificationCard } from "../../components/ui/callNotificationCard.jsx";
import { timeFormat } from "../../lib/timeFormat.js";
import { Avatar } from "../../components/ui/avatar.jsx";

export const ChatCard = ({chat})=> {
    
    const {user} = useContext(User_context);
    const {activeChat,setActiveChat} = useContext(ChatsContext);
    const [unread,set_unread] = useState(0);
    const [loading,set_loading] = useState(false);
    const [error,set_error] = useState(null);


    const handleActiveChat = ()=> {
       if( chat?._id === activeChat?._id) return
        setActiveChat(chat)
    }


    return (
        <div
            onClick={handleActiveChat}
            className={`flex items-center mb-1 gap-3 cursor-pointer rounded-md px-3 hover:bg-[#213036] ${
                activeChat?._id === chat._id ? 'bg-[#222e35]' : '' }`}
            >
            <Avatar size="lg" user_photo={chat?.contact?.profile_picture} />
            <div className="flex-1 py-3 min-w-0 border-b-1 border-[#222e35] text-[#f7f8fa]">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold truncate">
                        {chat?.contact?.name}
                    </h2>
                    <span className="text-xs text-[#667781]">
                        {timeFormat(chat?.last_message?.createdAt || chat?.last_message?.updatedAt)}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                     <div className="text-sm text-[#667781] truncate flex items-center gap-2">
                        {
                          (user?._id === chat?.last_message?.sender && chat?.last_message.type !== 'CALL') && 
                            (
                                <span className={chat?.last_message?.status === 'READ' ? 'text-emerald-400' : ''}>
                                    {chat?.last_message?.status === 'SENT' ? '✓ ' :  '✓✓ ' }
                                </span>
                            )
                        }
                        {
                            chat?.last_message.type === 'MEDIA' ? (
                                chat?.last_message?.file?.type === 'AUDIO' ?
                                <><FaMicrophone /> Audio</>: 
                                chat?.last_message?.file?.type === 'VIDEO' ?
                                <><FaVideo /> Video</>:
                                chat?.last_message?.file?.type === 'IMAGE' ?
                               <><FaRegImage /> Photo</>  : 
                               <> <BsFillFileEarmarkPdfFill /> {chat.last_message.file.name.slice(0,28)}  </> 
                            ) : 
                            chat?.last_message.type === 'CALL' &&
                            <CallNotificationCard call={chat?.last_message?.call} />
                        }
                        { 
                            chat?.last_message?.text?.length > 29 ? 
                            `${chat?.last_message?.text?.slice(0,28)}...`
                            : chat?.last_message?.text
                        }
                    </div> 
                     {unread > 0 && (
                        <span className="bg-emerald-800  text-white rounded-full px-2 py-1 text-xs min-w-[20px] text-center">
                        {unread}
                        </span>
                     )}
                </div>
            </div>
        </div>
    )
}