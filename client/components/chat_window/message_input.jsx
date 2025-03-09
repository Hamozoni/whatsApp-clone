"use client";
import { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { SlMicrophone } from "react-icons/sl"
import { LuSendHorizontal } from "react-icons/lu";

export const Message_input = ()=> {
        const [newMessage, setNewMessage] = useState('');
        const [messageList, setMessageList] = useState([]);
    
        const handleSendMessage = () => {
          if (newMessage.trim()) {
            const newMsg = {
              id: messageList.length + 1,
              text: newMessage,
              sender: 'me',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'sent'
            };
            setMessageList([...messageList, newMsg]);
            setNewMessage('');
          }
        };
    return (
        <div className="p-3 bg-[#222e35]">
            <div className="flex items-center gap-2">
                <AiOutlinePaperClip className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884] rotate-90" />
                
                <div className="flex items-center rounded-md  flex-1 relative bg-[#111b21] px-3 py-2">
                    <HiOutlineEmojiHappy className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#00a884]" />
                    <input
                        type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message"
                        className="w-full focus:outline-none text-[#f7f8fa] px-2 py-1"
                    />
                </div>
                <div className="">

                        <button
                            onClick={handleSendMessage}
                            className="bg-[#00a884] px-2 py-3 rounded-md text-white hover:bg-[#375f56] transition-colors"
                        >
                           {
                              newMessage?.length > 0 ? 
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