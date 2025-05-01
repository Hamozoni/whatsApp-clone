"use client";
import { useContext, useEffect, useRef, useState} from "react";
import { MdCallEnd } from "react-icons/md";
import { Call_context } from "@/contexts/call.context";
import Image from "next/image";

export const Outgoing_call = ({
    local_video,
    on_end_call,
    on_toggle_mute,
  })=> {

    const {callee} = useContext(Call_context);
    const local_video_ref = useRef(null)

    useEffect(()=> {
        if(local_video && local_video_ref.current) {
            local_video_ref.current.srcObject = local_video
        }
    },[local_video]);


    return (
        <div className="flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <Image 
                    src={callee?.profile_picture} 
                    width={60} 
                    height={60} 
                    alt={callee?.name} 
                    className=" rounded-full" 
                    />
                <h5>{callee?.name}</h5>
                <p>calling...</p>
            </div>
              <div className=""></div>
               <video 
                    className="w-auto h-screen object-cover rounded-md" 
                    ref={local_video_ref} 
                    autoPlay 
                    muted
                    />
            <div className="">
                <button 
                    onClick={on_end_call} 
                    className="p-3 rounded-full text-red-500 bg-blue-50"
                    >
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./outgoing-call.mp3" hidden autoPlay loop />
        </div>
    )
}