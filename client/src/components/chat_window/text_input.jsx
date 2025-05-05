import { Chat_window_context } from "../../contexts/chat_window.context";
import { useContext, useEffect, useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import { Close_model } from "../ui/close_model";

export const Text_input = ()=> {


    const {text,set_text,set_message} = useContext(Chat_window_context);
    const [show_emoji,set_show_emoji] = useState(false);

    const handle_emoji = (emojiObject)=> {
        set_text(prev=> `${prev} ${emojiObject.emoji}`);
    };

    useEffect(()=> {
        set_message(prev=> ({...prev,text}))
    },[text]);

    return (
        <div className="flex items-center rounded-md  flex-1 relative bg-[#111b21] px-3 py-2 hide_model">
            <HiOutlineEmojiHappy 
                onClick={()=> set_show_emoji(!show_emoji)} 
                className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884]" 
            />
            <input
                type="text"
                value={text}
                onChange={(e) => set_text(e.target.value)}
                placeholder="Type a message"
                className="w-full focus:outline-none text-[#f7f8fa] px-2 py-1 hide_model"
            />
            { show_emoji  &&
            <>
                <div className=" absolute top-0 left-0 -translate-y-[101%] z-20">
                    <EmojiPicker onEmojiClick={handle_emoji} />
                </div>
                <Close_model  set_model={set_show_emoji}/>
            </>
            }
        </div>
    )
}