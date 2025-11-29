import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { CloseModel } from "../modal/closeModel";


export const EmojiBtn = ({size = 'lg',setText})=> {

        const [isEmoji,setIsEmoji] = useState(false);
    
        const handleEmoji = (emojiObject)=> {
            setText(prev=> `${prev} ${emojiObject.emoji}`);
        };

    return (
        <div className="">
            <HiOutlineEmojiHappy 
                onClick={()=> setIsEmoji(!isEmoji)} 
                className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884]" 
            />

            { isEmoji  &&
            <>
                <div className=" fixed top-1/2 left-1/2 -translate-1/2 z-50">
                    <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
                <CloseModel  setCloseModel={setIsEmoji}/>
            </>
            }
        </div>
    )
}