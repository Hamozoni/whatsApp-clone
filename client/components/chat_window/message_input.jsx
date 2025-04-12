"user client"
import { AiOutlinePaperClip } from "react-icons/ai"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { SlMicrophone } from "react-icons/sl"
import { LuSendHorizontal } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { User_context } from "../../contexts/user.context";
import EmojiPicker from "emoji-picker-react";
import { Chose_document } from "../ui/chose_document";
import { Chat_window_context } from "@/contexts/chat_window.context";
import { post_data } from "@/lib/post_data";
import { Close_model } from "../ui/close_model";

export const Message_input = ()=> {

    const {set_messages,active_chat,message,set_message,set_active_chat} = useContext(Chat_window_context);
    const {socket,set_chats} = useContext(User_context);
    const [show_emoji,set_show_emoji] = useState(false);
    const [is_document,set_is_document] = useState(false);
    const [text,set_text] = useState('');
    const [loading,set_loading] = useState(false);
    const [error,set_error] = useState(null);

    useEffect(()=> {
        set_text('');
    },[active_chat]);

    useEffect(()=> {
        set_message(prev=>  ({...prev,text}));
    },[text]);

    const handle_send = async ()=> {
        const data = await post_data('message',message,set_loading,set_error);
        set_text('');
        socket?.emit('message_sent',data?.contact_chat);
        set_chats(prev=> {
         const chats =   prev.filter(e=> e?._id !== data?.sender_chat?._id);
            return [data?.sender_chat,...chats]
        });

        if(active_chat?._id === data?.sender_chat?._id) {
            set_messages(prev=> [...prev, data?.sender_chat?.last_message])
        }else {
            set_active_chat(data?.sender_chat);
        }



    };

    const handle_emoji = (emojiObject)=> {
        set_text(prev=> `${prev} ${emojiObject.emoji}`);
    }

    return (
        <div className="p-3 bg-[#222e35] relative hide_model">
            <div className="flex items-center gap-2 hide_model">
                {
                    is_document && 
                  <>
                    <Close_model set_model={set_is_document} />
                    <Chose_document />
                </>
                }
                <AiOutlinePaperClip onClick={()=> set_is_document(!is_document)} className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884] rotate-90 hide_model"  />
                
                <div className="flex items-center rounded-md  flex-1 relative bg-[#111b21] px-3 py-2 hide_model">
                    <HiOutlineEmojiHappy 
                        onClick={()=> set_show_emoji(!show_emoji)} 
                        className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884]" 
                    />
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => set_text(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handle_send()}
                        placeholder="Type a message"
                        className="w-full focus:outline-none text-[#f7f8fa] px-2 py-1 hide_model"
                    />
                </div>
                <div className="hide_model">
                    {
                        text?.length > 0 ? 
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
            { show_emoji  &&
            <>
                <div className=" absolute top-0 left-0 -translate-y-full z-20">
                    <EmojiPicker onEmojiClick={handle_emoji} />
                </div>
                <Close_model  set_model={set_show_emoji}/>
            </>
            }
        </div>
    )
}