"use client";

import { Call_context } from "@/contexts/call.context";
import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { RiCameraSwitchLine } from "react-icons/ri";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";

const f = 'absolute top-0 left-1/2 -translate-x-1/2 w-auto h-screen object-cover z-20';
const h = 'absolute top-2 left-2 z-30 max-w-[100px]  min-h-[150px] md:min-h-[250px] md:max-w-[200px] object-cover'

export const Connected_call = ({
    local_video,
    remote_video,
    on_end_call,
    on_toggle_mute,
    on_toggle_camera_mode,
})=> {

    const {
        callee,
        caller,
        set_call_status,
    } = useContext(Call_context);

    const {user,socket} = useContext(User_context);

    const [is_full_screen,set_is_full_screen] = useState(false);
    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);


    useEffect(()=>{
        if(local_video && local_video_ref.current) {
            local_video_ref.current.srcObject = local_video
        }
        if(remote_video && remote_video_ref.current) {
            remote_video_ref.current.srcObject = remote_video
        }
    },[local_video,remote_video]);



    return (
        <div className=" relative flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50 absolute top-3 left-1/2 -translate-x-1/2 z-40">
                <h5>{callee?._id === user?._id ? caller?.name : callee?.name}</h5>
                <p>05</p>
            </div>
                <video 
                    onClick={()=> set_is_full_screen(true)} 
                    className={is_full_screen ? f : h} 
                    autoPlay muted
                    ref={local_video_ref}
                    />
                <video 
                    onClick={()=> set_is_full_screen(false)} 
                    className={is_full_screen ? h : f} 
                    ref={remote_video_ref}
                    autoPlay />
            <div className="absolute w-fit bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-3 bg-[#ffffff07] p-2 rounded-xl">
                <button onClick={on_toggle_camera_mode} className="p-3 rounded-full text-blue-50 bg-[#0000001f]">
                    <RiCameraSwitchLine size={28}  />
                </button>
                <button onClick={on_end_call} className="p-3 rounded-full text-red-500 bg-blue-50 ">
                    <MdCallEnd size={28} />
                </button>
            </div>
        </div>
    );
};