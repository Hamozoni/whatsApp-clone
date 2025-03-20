"user client"
import { AiOutlinePaperClip } from "react-icons/ai"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { SlMicrophone } from "react-icons/sl"
import { LuSendHorizontal } from "react-icons/lu";
import { useContext, useState } from "react";
import { User_context } from "../context";
import axios from "axios";

export const Message_input = ()=> {

    const {user,active_chat} = useContext(User_context);

    console.log(active_chat)

    const [message,set_message] = useState('');


    const handle_send = async ()=> {

        try {

            const body = {
                chat_id: active_chat?._id,
                sender : user?._id,
                text: message,
                media: null,
                type : 'TEXT',
                status: 'SENT'
            }

            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message`,body);

            console.log(data);

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-3 bg-[#222e35]">
            <div className="flex items-center gap-2">
                <AiOutlinePaperClip className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884] rotate-90" />
                
                <div className="flex items-center rounded-md  flex-1 relative bg-[#111b21] px-3 py-2">
                    <HiOutlineEmojiHappy className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884]" />
                    <input
                        type="text"
                          value={message}
                          onChange={(e) => set_message(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handle_send()}
                        placeholder="Type a message"
                        className="w-full focus:outline-none text-[#f7f8fa] px-2 py-1"
                    />
                </div>
                <div className="">

                        <button
                            onClick={handle_send}
                            className="px-2 py-3 rounded-md text-white transition-colors"
                        >
                           {
                              message?.length > 0 ? 
                              <LuSendHorizontal className="h-6 w-6 text-[#f7f8fa] cursor-pointer" />
                              :
                              <SlMicrophone className="h-6 w-6 text-[#f7f8fa] cursor-pointer" />
                            }
                        </button>
                
                    
                </div>

            </div>
        </div>
    )
}