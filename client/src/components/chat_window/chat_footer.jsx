import { AiOutlinePaperClip } from "react-icons/ai"
import { SlMicrophone } from "react-icons/sl"
import { useContext, useState } from "react";
import { Chose_document } from "../ui/chose_document";
import { Chat_window_context } from "../../contexts/chat_window.context";
import { Close_model } from "../ui/close_model";

import {useEffect} from 'react'
import Audio_recorder from './audio_recorder'

import { Send_message_btn } from "./send_message_btn";
import { TextEmojiInput } from "../ui/textEmojiInput";

export const Chat_footer = ()=> {

    const {text,set_text,is_recorder,set_is_recorder,is_preview,set_message} = useContext(Chat_window_context);
    const [is_document,set_is_document] = useState(false);


    useEffect(()=> {
        set_message(prev=> ({...prev,text}))
    },[text]);

    return (
        <footer className="p-3 bg-[#222e35] relative">
            <div className="flex items-center gap-2"> 
                {
                    !is_preview &&
                    <AiOutlinePaperClip 
                        onClick={()=> set_is_document(!is_document)} 
                        className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884] rotate-90 hide_model"  
                    />
                }
                <TextEmojiInput placeholder='Type a message' text={text} setText={set_text} />
                <div >
                    {
                       ( text?.length > 0 || is_preview ) ? 
                        <Send_message_btn />
                       :
                        <button
                            onClick={()=> set_is_recorder(true)}
                            className="px-2 py-3 rounded-md text-white transition-colors hide_model"
                        >
                            <SlMicrophone className="h-6 w-6 text-[#f7f8fa] cursor-pointer" />
                        </button>
                    }
                </div>
            </div>
            
            {
                is_recorder && 
                <Audio_recorder />
            }
            {
                is_document && 
                <>
                    <Close_model set_model={set_is_document} />
                    <Chose_document set_is_document={set_is_document} />
                </>
            }

        </footer>
    )
}