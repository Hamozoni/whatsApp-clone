"user client"
import { AiOutlinePaperClip } from "react-icons/ai"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { SlMicrophone } from "react-icons/sl"
import { LuSendHorizontal } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { User_context } from "../context";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";

export const Message_input = ({receiver})=> {

    const {user,active_chat} = useContext(User_context);
    const [message,set_message] = useState('');
    const [show_emoji,set_show_emoji] = useState(false);

    useEffect(()=> {
        set_message('')
    },[active_chat])


    const handle_send = async ()=> {

        if(message?.length < 0) return
        try {

            const body = {
                receiver,
                chat_id: active_chat?._id,
                sender : user?._id,
                text: message,
                media: null,
                type : 'TEXT',
                status: 'SENT'
            }

            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message`,body);

            console.log(data);

            set_message('')

        }
        catch (error) {
            console.log(error);
        }
    };

    const handle_emoji = (emojiObject)=> {
        console.log(emojiObject.emoji)
        set_message(message + emojiObject.emoji );
    }

    useEffect(()=> {
        const handle_hide_emoji = (e)=> {
            if(e.target.classList.contains('hide_model')) {
                set_show_emoji(false)
            }
        }

        window.addEventListener('click',handle_hide_emoji);

        return ()=> window.removeEventListener('click',handle_hide_emoji)
    },[]);

    return (
        <div className="p-3 bg-[#222e35] relative hide_model">
            <div className="flex items-center gap-2 hide_model">
                <AiOutlinePaperClip className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884] rotate-90 hide_model"  />
                
                <div className="flex items-center rounded-md  flex-1 relative bg-[#111b21] px-3 py-2 hide_model">
                    <HiOutlineEmojiHappy 
                        onClick={()=> set_show_emoji(!show_emoji)} 
                        className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884]" 
                    />
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => set_message(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handle_send()}
                        placeholder="Type a message"
                        className="w-full focus:outline-none text-[#f7f8fa] px-2 py-1 hide_model"
                    />
                </div>
                <div className="hide_model">
                    {
                        message?.length > 0 ? 
                        <button
                                onClick={handle_send}
                                className="px-2 py-3 rounded-md text-white transition-colors hide_model"
                            >
                            <LuSendHorizontal className="h-6 w-6 text-[#f7f8fa] cursor-pointer " />
                       </button>
                       :
                        <button
                            className="px-2 py-3 rounded-md text-white transition-colors hide_model"
                        >
                            <SlMicrophone className="h-6 w-6 text-[#f7f8fa] cursor-pointer" />
                        </button>
                    }

                
                    
                </div>

            </div>
            <div className=" absolute top-0 left-0 -translate-y-full">
                {show_emoji && <EmojiPicker onEmojiClick={handle_emoji} />}
            </div>
        </div>
    )
}