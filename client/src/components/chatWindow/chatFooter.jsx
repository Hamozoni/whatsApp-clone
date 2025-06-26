import { AiOutlinePaperClip } from "react-icons/ai"
import { SlMicrophone } from "react-icons/sl"
import { useContext, useState } from "react";
import { SelectMessageFile } from "./selectMessageFile";
import {ChatsContext } from "../../contexts/chats.context";


import {useEffect} from 'react'
import AudioRecorder from './audioRecorder'

import { SendMessageBtn } from "./sendMessageBtn";
import { TextEmojiInput } from "../ui/textEmojiInput";
import { CloseModel } from "../modal/closeModel";

export const ChatFooter = ()=> {

    const {text,setText,isRecorder,setIsRecorder,isPreview,setMessage} = useContext(ChatsContext);
    const [isDocument,setIsDocument] = useState(false);


    useEffect(()=> {
        setMessage(prev=> ({...prev,text}))
    },[text]);

    return (
        <footer className="p-3 bg-[#111b21] relative rounded-lg">
            <div className="flex items-center gap-2"> 
                {
                    !isPreview &&
                    <AiOutlinePaperClip 
                        onClick={()=> setIsDocument(!isDocument)} 
                        className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884] rotate-90"  
                    />
                }
                <TextEmojiInput placeholder='Type a message' text={text} setText={setText} />
                <div >
                    {
                       ( text?.length > 0 || isPreview ) ? 
                        <SendMessageBtn />
                       :
                        <button
                            onClick={()=> setIsRecorder(true)}
                            className="px-2 py-3 rounded-md text-white transition-colors"
                        >
                            <SlMicrophone className="h-6 w-6 text-[#f7f8fa] cursor-pointer" />
                        </button>
                    }
                </div>
            </div>
            
            {
                isRecorder && 
                <AudioRecorder />
            }
            {
                isDocument && 
                <>
                    <CloseModel setCloseModel={setIsDocument} />
                    <SelectMessageFile setIsDocument={setIsDocument} />
                </>
            }

        </footer>
    )
}