"use client";

import { Call_context } from "@/contexts/call.context";
import { useContext, useEffect } from "react";
import { Outgoing_call } from "./outgoing_call";
import { Ringing_call } from "./ringing_call";
import { Connected_call } from "./connected_call";
import { User_context } from "@/contexts/user.context";

export const Call = ()=> {

    const {
        call_status,
        set_call_status,
        callee,
        caller,
        camera_facing_mode
    } = useContext(Call_context);

    const {socket,user} = useContext(User_context);

    const [local_video,set_local_video] = useState(null);
    const [remote_video,set_remote_video] = useState(null);

    const peer_connection = useRef(null);


    const start_call = async ()=> {

        try {

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: camera_facing_mode  ? 'environment' : "user", aspectRatio: 3/4 },
                audio: true
            });

            set_local_video(stream);

            const pc = new RTCPeerConnection({
                iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
                iceCandidatePoolSize: 10
            });

            peer_connection.current = pc;

            stream.getTracks().forEach(track=> {
                pc.addTrack(track,stream);
            });

            pc.ontrack = (e)=> {
                set_remote_video(e.streams[0])
            };

            pc.onicecandidate = ({candidate})=> {
                if(candidate) {
                    socket?.emit('ice_candidate',{
                        to: callee?._id,
                        data: candidate
                    });
                }
            };

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            socket?.emit('offer',{
                to: callee?._id,
                data : offer
            });
        }
        catch (error) {
            console.error(error)
        }

    };

    const answer_call = async ()=> {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: camera_facing_mode  ? 'environment' : "user", aspectRatio: 3/4 },
            audio: true
        });

        set_local_video(stream);

        const pc = peer_connection.current

        stream.getTracks().forEach(track=> {
            if(pc) {
                pc.addTrack(track,stream);
            };
        });

        const answer = await pc.createAnswer();

        pc.setLocalDescription(answer);

        socket?.emit('answer',{to: caller?._id,data:answer});
        set_call_status('connected');
    };

    const call_end = ()=> {

    }

    useEffect(()=> {
        if(user?._id === caller?._id) {
            start_call();
        };
        socket?.on('offer',async ({data})=> {
            const pc = new RTCPeerConnection({
                iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
                iceCandidatePoolSize: 10
            });

            peer_connection.current = pc;

            pc.ontrack = (e)=> {
                set_remote_video(e.streams[0])
            };

            pc.onicecandidate = ({candidate})=> {
                if(candidate) {
                    socket?.emit('ice_candidate',{to: caller?._id,data:candidate});
                }
            };

           await pc.setRemoteDescription(data)
        });

        socket?.on('answer',({data})=> {
            peer_connection.current.setRemoteDescription(data);
            set_call_status('connected')
        });

        socket?.on('ice_candidate', async ({data})=> {
            try {
                await peer_connection.current.addIceCandidate(data)
            }
            catch (error) {
                console.error(error)
            }
        })

    },[]);

    return (
        <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-30 bg-gray-900">
            {
                call_status === 'call' ? 
                <Outgoing_call /> :
                call_status === 'ringing'  ? 
                <Ringing_call /> :
                call_status === 'connected'  && 
                <Connected_call />
            }
        </div>
    );
};

