import { useEffect, useState } from "react";
import { MediaMessageCard } from './mediaMessageCard'
import { CallNotificationCard } from "../shared/callNotificationCard";
import { timeFormat } from "../../lib/timeFormat";

export const MessageCard = ({userId,message})=> {

    const [isMyMessage,setIsMyMessage] = useState(false);

    useEffect(()=> {
        setIsMyMessage(message?.sender?._id === userId);
    },[userId,message]);

    return (
        <div
            className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[65%] rounded-lg p-2 relative ${
                    isMyMessage
                    ? 'bg-emerald-800  ml-12'
                    : 'bg-[#222e35] mr-12'
                }`}
            >
            {
                message.type === 'MEDIA' ?
              <MediaMessageCard sender={message?.sender} file={message?.file}/>
              : message.type === 'CALL' && 
               <div className="">
                   <CallNotificationCard call={message?.call} />
                </div>
            }
            {
               (message.type === 'MEDIA' || message?.file?.type === 'AUDIO' || message.type === 'CALL') ? '':
              <p className="text-sm">
                    { message?.file?.type === 'APPLICATION' ? message?.file?.name : message?.text}
              </p>
            }
                <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-[10px] text-gray-300 font-[100]">
                        {timeFormat(message?.createdAt)}
                    </span>
                    {(isMyMessage && message.type !== 'CALL') &&(
                    <span className={`${message?.status === 'READ' ? 'text-emerald-300' :''} text-[10px]`}>
                        {message?.status === 'SENT' ? '✓' : '✓✓'}
                    </span>
                    )}
                </div>
            </div>
        </div>
    )
}