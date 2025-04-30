"use client";

import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState} from "react";
import { MdCallEnd } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Call_context } from "@/contexts/call.context";
import Image from "next/image";

export const Outgoing_call = ()=> {

    const {
        callee,
        set_call_status,
        get_user_media,
    } = useContext(Call_context);

    
    const {socket,user} = useContext(User_context);
    // const local_video_ref = useRef(null);
    // const [local_video,set_local_video] = useState(null);


    const end_call = async()=> {
        socket.emit('call_end',{to:callee?._id});
        // if(local_video){
        //     local_video.getTracks().forEach(track=> track.stop());
        // }
        set_call_status('idle');
    };

    useEffect(()=> {
           const start_call = async () => {
                // if(local_video_ref.current) {
                //     get_user_media()
                //     .then(stream=> {
                //         set_local_video(stream);
                //         local_video_ref.current.srcObject = stream
                        socket?.emit('call',{from: {_id: user?._id, name: user?.name, profile_picture: user?.profile_picture} ,to:callee?._id})
                //     })
                // }
           };
           start_call();

        //    return()=> {
        //     if(local_video){
        //         local_video.getTracks().forEach(track=> track.stop());
        //     }
        //   }
    },[]);

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <Image src={callee?.profile_picture} width={60} height={60} alt={callee?.name} className=" rounded-full" />
                <h5>{callee?.name}</h5>
                <p>calling...</p>
            </div>
              <div className=""></div>
               {/* <video className="w-auto h-screen object-cover rounded-md" ref={local_video_ref} autoPlay muted/> */}
            <div className="">
                <button 
                    onClick={end_call} 
                    className="p-3 rounded-full text-red-500 bg-blue-50"
                    >
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./outgoing-call.mp3" hidden autoPlay loop />
        </div>
    )
}