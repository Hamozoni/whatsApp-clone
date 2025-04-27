"use client";

import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Chat_window_context } from "@/contexts/chat_window.context";

export const Outgoing_call = ()=> {


    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-30 bg-gray-900">
            <video className=" relative top-0 left-0 w-screen h-screen z-30 " ref={local_video_ref} autoPlay muted/>
            <video ref={remote_video_ref} className="relative top-0 left-0 w-[150px] h-[150px] z-40" autoPlay />
        </div>
    )
}