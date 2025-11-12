import { BsFillFileEarmarkPdfFill } from "react-icons/bs"
import { FaMicrophone, FaRegImage, FaVideo } from "react-icons/fa6"
import { CallNotificationCard } from "../../../components/shared/callNotificationCard"

export const ChatCardLastMessage = ({chat,user}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="text-sm text-[#667781] truncate flex items-center gap-2">
                {
                    (user?._id === chat?.last_message?.sender?._id && chat?.last_message.type !== 'CALL') && 
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
                        <> <BsFillFileEarmarkPdfFill /> 
                           <span className=" line-clamp-1"> {chat.last_message.file.name} </span> 
                        </> 
                    ) : 
                    chat?.last_message.type === 'CALL' &&
                    <CallNotificationCard call={chat?.last_message?.call} />
                }
                <span className=" line-clamp-1 max-w-full">
                    {chat?.last_message?.text?.slice(0,30)}{chat?.last_message?.text?.length > 29 ? '...': ''}
                </span>
            </div> 
        </div>
    )
}