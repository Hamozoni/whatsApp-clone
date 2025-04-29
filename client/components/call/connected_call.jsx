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
        camera_facing_mode,
        set_camera_facing_mode,
        set_call_status,
        get_user_media
    } = useContext(Call_context);

    const {user,socket} = useContext(User_context);

    const [is_full_screen,set_is_full_screen] = useState(false);
    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);
    const peer_connection = useRef(null);


    const create_peer_connection = async (stream)=> {

        peer_connection.current =  new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });

        stream.getTracks().forEach(track=> {
            peer_connection.current.addTrack(track,stream)
        });

        peer_connection.current.ontrack = (e)=> {
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
        });
    };


    const call_end = ()=> {
        socket?.emit('call_end',{ to: user?._id ===  caller?._id ? callee?._id : caller?._id,});
        local_video_ref.current.srcObject.getTracks().forEach(track=> track.stop());
        set_call_status('idle')
    };

    useEffect(()=>{

        const start_call = async ()=> {
            const stream = await get_user_media()
            create_peer_connection(stream);
        };

        start_call();
        return ()=> call_end();
    },[]);

    useEffect(()=> {

        socket?.on('call_end',()=> {
            call_end()
        });

        socket?.on('signal', async ({from,type,to,data})=> {
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
                    await peer_connection.current.addIceCandidate(new RTCIceCandidate(data))
                    
                }
            }
            catch (error) {
                console.error(error);
            }

        });

        return ()=> {
            socket?.off('call_end');
            socket?.off('signal');

        }
    },[socket])

    const switch_camera = async()=> {

            const stream = await get_user_media();

            const new_stream = stream.getVideoTracks()[0];

            const sender = peer_connection.current.getSenders().find(s=> s.track.kind === 'video');

            if(sender) {
                await sender.replaceTrack(new_stream)
            };
            local_video_ref.current.srcObject = stream

    }

    const handle_camera_mode = async ()=> {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const video_devices = devices.filter(d=> d.kind === 'videoinput')?.length;
        if(video_devices < 2) return;
        set_camera_facing_mode(!camera_facing_mode);
        switch_camera()
    }

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