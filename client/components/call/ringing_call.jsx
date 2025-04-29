"use client";

import { Call_context } from "@/contexts/call.context";
import { User_context } from "@/contexts/user.context";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { MdCallEnd } from "react-icons/md";

export const Ringing_call = ()=> {

    const {caller,set_call_status,camera_facing_mode,local_video} = useContext(Call_context);
    const {socket} = useContext(User_context);

    const local_video_ref = useRef(null)


    useEffect(()=> {
        socket?.on('call_end',()=> {
            set_call_status('idle');
        });
    },[socket]);

    useEffect(()=> {
        if(local_video_ref.current && local_video.current) {
            local_video_ref.current.srcObject = local_video.current
        }
    },[local_video]);

    const end_call = ()=> {
        socket.emit('call_end',{to:caller?._id})
        set_call_status('idle');
    };

    const answer_call = ()=> {
        socket.emit('call_connected',{to:caller?._id})
        set_call_status('connected');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <Image src={caller?.profile_picture} width={60} height={60} alt={caller?.name} className=" rounded-full" />
                <h5>{caller?.name}</h5>
                <p>coming call...</p>
            </div>

            <video 
                className="w-auto h-screen object-cover rounded-md" 
                ref={local_video_ref} 
                autoPlay muted
                />
            <div className="flex items-center justify-center gap-5">
                <button onClick={end_call} className="p-3 rounded-full text-red-500 bg-blue-50">
                    <MdCallEnd size={28} />
                </button>
                <button onClick={answer_call} className="p-3 rounded-full text-white bg-emerald-400">
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./ringing-call.mp3" hidden autoPlay loop />
        </div>
    );
};
