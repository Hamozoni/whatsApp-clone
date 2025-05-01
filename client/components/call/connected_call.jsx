"use client";

import { Call_context } from "@/contexts/call.context";
import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { RiCameraSwitchLine } from "react-icons/ri";

const f = 'absolute top-0 left-1/2 -translate-x-1/2 w-auto h-screen object-cover z-20';
const h = 'absolute top-2 left-2 z-30 max-w-[100px]  min-h-[150px] md:min-h-[250px] md:max-w-[200px] object-cover'

export const Connected_call = ()=> {

    const {
        callee,
        caller,
        set_call_status,
    } = useContext(Call_context);

    const {user,socket} = useContext(User_context);

    const [is_full_screen,set_is_full_screen] = useState(false);
    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);



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
                <button onClick={handle_camera_mode} className="p-3 rounded-full text-blue-50 bg-[#0000001f]">
                    <RiCameraSwitchLine size={28}  />
                </button>
                <button onClick={call_end} className="p-3 rounded-full text-red-500 bg-blue-50 ">
                    <MdCallEnd size={28} />
                </button>
            </div>
        </div>
    );
};