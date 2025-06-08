import { useEffect, useState } from "react";
import { Media_message_card } from './media_message_card'
import { Call_card } from "../chats/call_card";

export const Message_card = ({user_id,message})=> {

    const [is_my_message,set_is_my_message] = useState(false);

    useEffect(()=> {
        set_is_my_message(message?.sender === user_id);
    },[]);

    return (
        <div
            className={`flex hide_model ${is_my_message ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[65%] rounded-lg p-1 relative hide_model ${
                    is_my_message
                    ? 'bg-emerald-800  ml-12'
                    : 'bg-[#222e35] mr-12'
                }`}
                style={{
                    boxShadow: '0 1px 0.5px rgba(11,20,26,.13)'
                }}
            >
            {
                message.type === 'MEDIA' ?
              <Media_message_card file={message?.file}/>
              : message.type === 'CALL' && 
               <div className="p-2 ">
                   <Call_card call={message?.call} />
                </div>
            }
            {
               (message.type === 'MEDIA' || message?.file?.type === 'AUDIO' || message.type === 'CALL') ? '':
              <p className="text-sm hide_model p-2">{ message?.file?.type === 'APPLICATION' ? message?.file?.name : message?.text}</p>
            }
            <div className="flex items-center justify-end space-x-1 mt-1 hide_model">
                <span className="text-[10px] text-gray-300 font-[100] hide_model">
                    {new Date(message?.createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'})}
                </span>
                {(is_my_message && message.type !== 'CALL') &&(
                <span className={`${message?.status === 'READ' ? 'text-emerald-300' :''} text-[10px] hide_model`}>
                    {message?.status === 'SENT' ? '✓' : '✓✓'}
                </span>
                )}
            </div>
            </div>
        </div>
    )
}