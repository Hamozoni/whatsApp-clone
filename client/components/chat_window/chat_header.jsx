"use client"
import { GoSearch } from "react-icons/go"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoCallOutline,IoVideocamOutline  } from "react-icons/io5";
import { useContext } from "react";
import { Call_context } from "@/contexts/call.context";
import { User_context } from "@/contexts/user.context";
import { MdArrowBackIos } from "react-icons/md";
import { Chat_window_context } from "@/contexts/chat_window.context";


export const Chat_header = ({receiver})=> {

    const {set_call_status,set_callee,set_caller,set_call_type} = useContext(Call_context);
    const {set_active_chat} = useContext(Chat_window_context)
    const {user,socket} = useContext(User_context)

    const start_call = (type)=> {
        set_call_status('call');
        set_callee(receiver);
        const user_info = {
            _id: user?._id,
            name: user?.name,
            profile_picture: user?.profile_picture
        }
        set_caller(user_info);
        socket?.emit('call',{
            to: receiver?._id,
            from: user_info,
            type,
        });
        set_call_type(type);
    };


    return (
        <div className="p-3 bg-[#222e35] text-[#f7f8fa] flex items-center hide_model">
            <div className="flex items-center gap-2 hide_model pr-2">
                {/* <GoSearch className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#afb3b9] hide_model " /> */}
                <MdArrowBackIos onClick={()=> set_active_chat(null)} className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#bcc0c7] hide_model" />
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden hide_model">
                <img src={receiver?.profile_picture} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="ml-4 flex-1 hide_model">
                <h2 className="font-semibold text-[#f7f8fa] hide_model">
                   {receiver?.name}
                </h2>
                <p className="text-sm font-light text-[#f7f8fa] hide_model">
                {receiver?.in_online ? 'online' : 'offline'}
                </p>
            </div>
            <div className="flex gap-5 items-center hide_model">
                <div className="flex items-center bg-[#394b55] rounded-md hide_model">
                    <button onClick={()=> start_call('audio')}  className="flex justify-center items-center p-2 rounded-md hover:bg-[#00a884] cursor-pointer hide_model ">
                        <IoCallOutline size={18} className='text-[#f7f8fa]'/>
                    </button>
                    <div className="w-[1px] min-w[1px] h-[20px] min-h-[20px] bg-[#ffffff] hide_model">  </div>
                    <button onClick={()=> start_call('video')} className="flex justify-center items-center p-2 rounded-md hover:bg-[#00a884] cursor-pointer hide_model">
                        <IoVideocamOutline size={18} className='text-[#f7f8fa] hide_model'/>
                    </button>
                </div>
            </div>
        </div>
    )
}