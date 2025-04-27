"use client";

import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState} from "react";
import { MdCallEnd } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { Chat_window_context } from "@/contexts/chat_window.context";
import { Call_context } from "@/contexts/call.context";
import Image from "next/image";

export const Outgoing_call = ()=> {

    const {callee,caller,set_call_status} = useContext(Call_context);
    const {socket} = useContext(User_context);

    const local_video_ref = useRef(null);
    const peer_connection = useRef(null);


    const create_peer_connection = (stream) => {

        const pc = new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });

        stream.getTracks()?.forEach(track=> pc.addTrack(track,stream));

        pc.onicecandidate = ({candidate})=> {
            socket?.emit('ice_candidate',{
                from: caller,
                to: callee?._id,
                candidate
            })
        };

        pc.createOffer()
        .the((offer)=> {
            pc.setLocalDescription(offer)
        })
        .the(()=> {
            socket?.emit('call',{
                from: caller,
                to: callee?._id,
                offer: pc.localDescription
            })
        });

        peer_connection.current = pc
    };



    useEffect(()=> {
        const init = async ()=> {
            try {

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });

                local_video_ref.current.srcObject = stream;
                create_peer_connection(stream);

            }
            catch (error) {
                // set_call_status('idle')
            }
        };
        init();

        return ()=> {
            if(peer_connection.current){
                peer_connection.current.close();
            }

            if(local_video_ref.current) {
                local_video_ref.current.srcObject.getTracks().forEach(track=> track.stop())
            }

        }
    },[]);

    const end_call = ()=> {
        set_call_status('idle')
    }

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <Image src={callee?.profile_picture} width={60} height={60} alt={callee?.name} className=" rounded-full" />
                <h5>{callee?.name}</h5>
                <p>calling...</p>
            </div>
            <video className="w-[450px] h-[400px] rounded-md" ref={local_video_ref} autoPlay muted/>
            <div className="">
                <button onClick={end_call} className="p-3 rounded-full text-red-500 bg-blue-50">
                    <MdCallEnd size={28} />
                </button>
            </div>
        </div>
    )
}