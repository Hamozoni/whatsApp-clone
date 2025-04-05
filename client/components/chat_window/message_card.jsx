"use client";
import { useEffect, useState } from "react";

export const Message_card = ({user_id,message,status})=> {

    const [is_my_message,set_is_my_message] = useState(false);
    const [message_status,set_message_status] = useState(message?.status);

    useEffect(()=> {
        set_is_my_message(message?.sender === user_id);

        set_message_status(message?.status !== 'SENT' ? message?.status : status )
    },[status]);

    return (
        <div
            className={`flex hide_model ${is_my_message ? 'justify-end' : 'justify-start'}`}
        >
            <div
            className={`max-w-[65%] rounded-lg p-3 relative hide_model ${
                is_my_message
                ? 'bg-emerald-800  ml-12'
                : 'bg-[#222e35] mr-12'
            }`}
            style={{
                boxShadow: '0 1px 0.5px rgba(11,20,26,.13)'
            }}
            >
            <p className="text-sm hide_model">{message?.text}</p>
            <div className="flex items-center justify-end space-x-1 mt-1 hide_model">
                <span className="text-[10px] text-gray-300 font-[100] hide_model">
                    {new Date(message?.createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'})}
                </span>
                {is_my_message && (
                <span className={`${message_status === 'READ' ? 'text-emerald-300' :''} text-[10px] hide_model`}>
                    {message_status === 'SENT' ? '✓' : '✓✓'}
                </span>
                )}
            </div>
            </div>
        </div>
    )
}