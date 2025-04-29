"use client";

import { Call_context } from "@/contexts/call.context";
import { User_context } from "@/contexts/user.context";
import { useContext, useEffect, useRef, useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { RiCameraSwitchLine } from "react-icons/ri";

const f = 'absolute top-0 left-1/2 -translate-x-1/2 w-auto h-screen object-cover z-20';
const h = 'absolute top-2 left-2 z-30 max-w-[100px]  min-h-[150px] md:min-h-[250px] md:max-w-[200px] object-cover'

export const Connected_call = ()=> {

    const {callee,caller,camera_facing_mode,set_camera_facing_mode} = useContext(Call_context);
    const {user,socket} = useContext(User_context);

    const local_video_ref = useRef(null);
    const remote_video_ref = useRef(null);
    const peer_connection = useRef(null);

    const [is_full_screen,set_is_full_screen] = useState(false);


    const create_peer_connection = async ()=> {

        peer_connection.current =  peer_connection.current || new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });

        stream.getTracks().forEach(track=> {
            peer_connection.current.addTrack(track,stream)
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

    const get_user_media = async()=> {

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: camera_facing_mode  ? 'environment' : "user"  ,aspectRatio: 3/4 },
                audio: true
            });

            local_video_ref.current.srcObject = stream;
            return stream;
        }
        catch (error) {
            console.error(error)
        }
            
    };

    const start_call = async () => {
       await get_user_media()
        .then( async (stream)=>{
          await create_peer_connection(stream);
        })
    }
    useEffect(()=>{
        start_call();

        socket?.on('camera_mode',async()=>{
            await get_user_media()
            .then(async (stream)=>{
                stream.getTracks().forEach(track=> {
                    peer_connection.current.addTrack(track,stream)
                });

                peer_connection.current.ontrack = (e)=> {
                    console.log(e.streams[0])
                    remote_video_ref.current.srcObject = e.streams[0]
                };


            });
        });

    },[socket,camera_facing_mode]);

    const handle_camera_mode = async ()=> {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const video_devices = devices.filter(d=> d.kind === 'videoinput')?.length;
        if(video_devices < 2) return;
        set_camera_facing_mode(!camera_facing_mode);
        socket?.emit('camera_mode',{
            to: user?._id ===  caller?._id ? callee?._id : caller?._id,
        });
    }

    return (
        <div className=" relative flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50 absolute top-3 left-1/2 -translate-x-1/2 z-40">
                <h5>{callee?._id === user?._id ? caller?.name : callee?.name}</h5>
                <p>05</p>
            </div>
            <video onClick={()=> set_is_full_screen(true)} className={is_full_screen ? f : h} ref={local_video_ref} autoPlay muted/>
            <video onClick={()=> set_is_full_screen(false)} className={is_full_screen ? h : f} ref={remote_video_ref} autoPlay />
            <div className="absolute w-fit bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3 bg-[#ffffff07] p-2 rounded-xl">
                <button onClick={handle_camera_mode} className="p-3 rounded-full text-blue-50 bg-[#0000001f]">
                    <RiCameraSwitchLine size={28}  />
                </button>
                <button className="p-3 rounded-full text-red-500 bg-blue-50 ">
                    <MdCallEnd size={28} />
                </button>
            </div>
        </div>
    );
};