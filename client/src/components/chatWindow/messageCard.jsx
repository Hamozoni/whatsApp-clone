import { useEffect, useState } from "react";
import { MediaMessageCard } from './mediaMessageCard'
import { CallNotificationCard } from "../ui/callNotificationCard";
import { timeFormat } from "../../lib/timeFormat";

export const MessageCard = ({userId,message})=> {

    const [isMyMessage,setIsMyMessage] = useState(false);

    useEffect(()=> {
        setIsMyMessage(message?.sender === userId);
    },[userId,message]);

    return (
        <div
            className={`flex hide_model ${isMyMessage ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[65%] rounded-lg p-1 relative hide_model ${
                    isMyMessage
                    ? 'bg-emerald-800  ml-12'
                    : 'bg-[#222e35] mr-12'
                }`}
                style={{
                    boxShadow: '0 1px 0.5px rgba(11,20,26,.13)'
                }}
            >
            {
                message.type === 'MEDIA' ?
              <MediaMessageCard file={message?.file}/>
              : message.type === 'CALL' && 
               <div className="p-2 ">
                   <CallNotificationCard call={message?.call} />
                </div>
            }
            {
               (message.type === 'MEDIA' || message?.file?.type === 'AUDIO' || message.type === 'CALL') ? '':
              <p className="text-sm hide_model p-2">{ message?.file?.type === 'APPLICATION' ? message?.file?.name : message?.text}</p>
            }
            <div className="flex items-center justify-end space-x-1 mt-1 hide_model">
                <span className="text-[10px] text-gray-300 font-[100] hide_model">
                    {timeFormat(message?.createdAt)}
                </span>
                {(isMyMessage && message.type !== 'CALL') &&(
                <span className={`${message?.status === 'READ' ? 'text-emerald-300' :''} text-[10px] hide_model`}>
                    {message?.status === 'SENT' ? '✓' : '✓✓'}
                </span>
                )}
            </div>
            </div>
        </div>
    )
}