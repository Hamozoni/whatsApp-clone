import { IoSend } from "react-icons/io5"
import { SiGradleplaypublisher } from "react-icons/si"
import { TextEmojiInput } from "../ui/textEmojiInput"


export const PostStatusFooter = ({onClick,isInput = false,placeholder,text,setText}) => {
    return (
        <footer className="bg-[#5e5a5a3a]">
            <div className="flex items-center gap-2 max-w-[970px] justify-between p-4 container mx-auto">
                <button className="flex items-center gap-1 bg-[#00000065] p-2  md:px-6 rounded-3xl">
                    <SiGradleplaypublisher size={20} />
                     <span className=" hidden md:flex">Status (Status)</span>
                </button>
                {
                    isInput && 
                    <TextEmojiInput 
                        text={text} 
                        setText={setText} 
                        placeholder={placeholder} 
                        />
                }
                <button onClick={onClick} className="bg-[#14752181] rounded-full p-2">
                    <IoSend size={22} />
                </button>
            </div>
        </footer>
    )
}