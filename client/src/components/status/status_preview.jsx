import { IoChevronBackSharp,IoClose,IoPlay } from "react-icons/io5";
import { PiSpeakerSimpleHighFill,PiSpeakerSimpleSlashFill } from "react-icons/pi";
import { BsEmojiSmile } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdSend } from "react-icons/md";

import { Avatar } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";

export const Status_preview = ({status,set_is_status})=> {

    const [playing_index,set_playing_index] = useState(0);
    const [timer,set_timer] = useState(0);
    const interval_ref = useRef(null);

    useEffect(()=> {
        interval_ref.current = setInterval(()=> {

        },[1000]);

        return ()=> clearInterval(interval_ref.current);
    },[playing_index])

    return (
        <div  className="fixed z-30 left-0 top-0 w-dvw h-dvh p-4 bg-[#23393f]">
            <div className="flex items-start justify-between fixed z-40 left-0 top-0 w-screen max-w-full p-4">
                <button onClick={()=> set_is_status(false)}>
                    <IoChevronBackSharp size={28}  />
                </button>
                <div className="w-[480px] max-w-full">
                    <div className="flex items-center gap-1 mb-3">
                        {
                            status.map((st)=> (
                                <div key={st?._id} className="h-2 w-full flex-1 bg-amber-700 rounded-md"></div>
                            ))
                        }
                    </div>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar size="lg" user_photo={status[0]?.user?.profile_picture} />
                            <div className="">
                                <h6>{status[playing_index]?.user?.name}</h6>
                                <p>today at {new Date(status[playing_index]?.createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'})}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button>
                                <IoPlay size={28} />
                            </button>
                            <button>
                                <PiSpeakerSimpleHighFill size={28}  />
                            </button>
                            <button>
                                <HiDotsVertical size={28}  />
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={()=> set_is_status(false)}>
                    <IoClose  size={28} />
                </button>
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className="fixed z-40 left-0 bottom-0 w-screen p-4 flex items-center gap-3">
                <button>
                    <BsEmojiSmile size={28}  />
                </button>
                <input type="text" className="outline-0 p-3 flex-1 bg-[#0000002f] rounded-md" placeholder="Type a reply..." />
                <button><MdSend size={28}  /></button>
            </div>
        </div>
    )
}