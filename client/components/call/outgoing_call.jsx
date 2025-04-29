"use client";

import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef} from "react";
import { MdCallEnd } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Call_context } from "@/contexts/call.context";
import Image from "next/image";

export const Outgoing_call = ()=> {

    const {
        callee,
        caller,
        set_call_status,
        local_video
    } = useContext(Call_context);

    
    const {socket} = useContext(User_context);
    const local_video_ref = useRef(null);


    const end_call = ()=> {
        socket.emit('call_end',{to:callee?._id});
    };

    useEffect(()=> {
            local_video_ref.current?.srcObject = local_video.current.srcObject
    
    },[local_video]);

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <Image src={callee?.profile_picture} width={60} height={60} alt={callee?.name} className=" rounded-full" />
                <h5>{callee?.name}</h5>
                <p>calling...</p>
            </div>
               <video className="w-auto h-screen object-cover rounded-md" ref={local_video_ref} autoPlay muted/>
            <div className="">
                <button onClick={end_call} className="p-3 rounded-full text-red-500 bg-blue-50">
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./outgoing-call.mp3" hidden autoPlay loop />
        </div>
    )
}