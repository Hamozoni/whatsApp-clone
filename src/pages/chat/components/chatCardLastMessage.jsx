import { BsFillFileEarmarkPdfFill } from "react-icons/bs"
import { FaMicrophone, FaRegImage, FaVideo } from "react-icons/fa6"
import { CallNotificationCard } from "../../../components/shared/callNotificationCard"

export const ChatCardLastMessage = ({chat,user}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="text-sm text-[#667781] truncate flex items-center gap-2">
                {
                    (user?._id === chat?.lastMessage?.sender?._id && chat?.lastMessage.type !== 'CALL') && 
                    (
                        <span className={chat?.lastMessage?.status === 'READ' ? 'text-emerald-400' : ''}>
                            {chat?.lastMessage?.status === 'SENT' ? '✓ ' :  '✓✓ ' }
                        </span>
                    )
                }
                {
                    chat?.last_message.type === 'MEDIA' ? (
                        chat?.lastMessage?.mediaMeta?.type === 'AUDIO' ?
                        <><FaMicrophone /> Audio</>: 
                        chat?.lastMessage?.mediaMeta?.type === 'VIDEO' ?
                        <><FaVideo /> Video</>:
                        chat?.lastMessage?.mediaMeta?.type === 'IMAGE' ?
                        <><FaRegImage /> Photo</>  : 
                        <> <BsFillFileEarmarkPdfFill /> 
                           <span className=" line-clamp-1"> {chat.lastMessage.mediaMeta.name} </span> 
                        </> 
                    ) : 
                    chat?.lastMessage.type === 'CALL' &&
                    <CallNotificationCard call={chat?.lastMessage?.call} />
                }
                <span className=" line-clamp-1 max-w-full">
                    {chat?.lastMessage?.text?.slice(0,30)}{chat?.lastMessage?.text?.length > 29 ? '...': ''}
                </span>
            </div> 
        </div>
    )
}