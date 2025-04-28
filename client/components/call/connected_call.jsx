"use client";

import { Call_context } from "@/contexts/call.context";
import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef } from "react";
import { MdCallEnd } from "react-icons/md";

export const Connected_call = ()=> {

    const {callee,caller} = useContext(Call_context);
    const {user,socket} = useContext(User_context);

    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);
    const peer_connection = useRef(null);


    const create_peer_connection = async()=> {
        peer_connection.current = new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });

        local_video_ref.current.srcObject.getTracks().forEach(track=> {
            peer_connection.current.addTrack(track,local_video_ref.current.srcObject)
        });

        peer_connection.current.ontrack = (e)=> {
            console.log(e.streams[0])
            remote_video_ref.current.srcObject = e.streams[0]
        };

        peer_connection.current.onicecandidate = ({candidate})=> {
            if(candidate) {
                socket?.emit('signal',{
                    from : user?._id ===  caller?._id ? caller : callee ,
                    to: user?._id ===  caller?._id ? callee?._id : caller?._id,
                    type: 'ice_candidate',
                    data: candidate
                })
            }
        };

        const offer  = await peer_connection.current.createOffer();
        await peer_connection.current.setLocalDescription(offer);

        socket.emit('signal',{
            from : user?._id ===  caller?._id ? caller : callee ,
            to: user?._id ===  caller?._id ? callee?._id : caller?._id,
            type: 'offer',
            data: offer
        })

        socket.on('signal', async ({from,type,to,data})=> {
            if(!peer_connection.current) return;

            try {
                if(type === 'offer') {
                    await peer_connection.current.setRemoteDescription(data);
                    const answer = await peer_connection.current.createAnswer();
                    await peer_connection.current.setLocalDescription(answer);

                    socket.emit('signal',{
                        to: from?._id,
                        from: to === callee?._id ? callee : caller,
                        type: 'answer',
                        data: answer
                    })
                } else if (type === 'answer') {
                    await peer_connection.current.setRemoteDescription(data)
                } else if (type === 'ice_candidate') {
                    await peer_connection.current.addIceCandidate(
                        new RTCIceCandidate(data)
                    )
                }
            }
            catch (error) {
                console.error(error);
            }

        })
    };

    const get_media = async()=> {

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: true
            });


            local_video_ref.current.srcObject = stream;
            create_peer_connection()
    }
    useEffect(()=>{
        get_media();
    },[socket]);

    return (
        <div className=" relative flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <h5>{callee?._id === user?._id ? caller?.name : callee?.name}</h5>
                <p>05</p>
            </div>
            <video className=" absolute top-0 left-0 z-30 w-[300px] h-[300px] rounded-md" ref={local_video_ref} autoPlay muted/>
            <video className=" absolute top-0 left-0 w-full h-full z-30" ref={remote_video_ref} autoPlay />
            <div className="">
                <button className="p-3 rounded-full text-red-500 bg-blue-50">
                    <MdCallEnd size={28} />
                </button>
            </div>
        </div>
    );
};