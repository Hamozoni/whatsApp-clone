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


    const create_peer_connection = ()=> {
        peer_connection.current = new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });

        local_video_ref.current.srcObject.getTracks().forEach(track=> {
            peer_connection.current.addTrack(track,local_video_ref.current.srcObject)
        });

        peer_connection.current.ontrack = (e)=> {
            remote_video_ref.current.srcObject = e.streams[0]
        };

        peer_connection.current.onicecandidate = ({candidate})=> {
            if(candidate) {
                socket?.emit('signal',{
                    to: callee?._id,
                    type: 'ice_candidate',
                    data: candidate
                })
            }
        };

        socket.on('signal', async ({type})=> {
            if(!peer_connection.current) return;

            try {
                if(type === 'offer') {
                    await peer_connection.current.setRemoteDescription(data);
                    const answer = await peer_connection.current.createAnswer();
                    await peer_connection.current.setLocalDescription(answer);

                    socket.emit('signal',{
                        
                    })
                }
            }
            catch (error) {
                console.error(error);
            }

        })
    };

    const get_media = async()=> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });


            local_video_ref.current.srcObject = stream;

            return stream;
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{

        const init  = async ()=> {

        }

    },[]);

    return (
        <div className=" relative flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <Image 
                    src={ callee?._id === user?._id ? caller?.profile_picture : callee?.profile_picture} 
                    width={30} 
                    height={30} 
                    alt='caller' 
                    className=" rounded-full" />
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