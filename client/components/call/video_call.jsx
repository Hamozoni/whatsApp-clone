"use client";

import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState } from "react";

export const Video_call = ()=> {

    const {socket} = useContext(User_context);
    const [pc,set_pc] = useState(null);
    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);
    const peers_ref = useRef({});

    const create_peer_connection = async (user_id,stream)=> {

        const peer_connection = new RTCPeerConnection({
            iceServers: [{urls:'stun:stun.l.google.com:19302'}]
        });

        stream.getTracks().forEach(track=> {
            peer_connection.addTrack(track,stream);
        });

        peer_connection.onicecandidate = ({candidate})=> {
            if(candidate) {
                socket.emit('singal',{
                    to: user_id,
                    type: 'ice-candidate',
                    payload : candidate
                });
            };
        };

        peer_connection.ontrack = (e)=> {
            remote_video_ref.current.srcObject = e.streams[0];
        };

        peers_ref.current[user_id] = peer_connection;

        const offer = await peer_connection.createOffer();

        await peer_connection.setLocalDescription(offer);

        socket.emit('singal',{
            to: user_id,
            type: 'offer',
            payload: offer,
        });
    };


    const handle_signal = async(from,type,payload) => {
        const peer_connection = peers_ref.current[from] || new RTCPeerConnection({
            iceServers: [{urls:'stun:stun.l.google.com:19302'}]
        });

        
    }

    useEffect(()=>  {

    },[]);

    return (
        <div className="">
            <video ref={local_video_ref} autoPlay muted/>
            <video ref={remote_video_ref} autoPlay />
        </div>
    )
}