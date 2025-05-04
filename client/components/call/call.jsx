"use client";

import { Call_context } from "@/contexts/call.context";
import { useContext, useEffect, useRef, useState } from "react";
import { Outgoing_call } from "./outgoing_call";
import { Ringing_call } from "./ringing_call";
import { Connected_call } from "./connected_call";
import { User_context } from "@/contexts/user.context";
import { post_data } from "@/lib/post_data";
import { handle_send_message } from "@/lib/handle_send_message";
import { Chat_window } from "../chat_window/chat_window";

export const Call = ()=> {

    const {
        call_status,
        set_call_status,
        callee,
        caller,
        call_type,
    } = useContext(Call_context);

    const {socket,user} = useContext(User_context);

    const {
        set_message,
        message,
        set_chats,
        active_chat,
        set_active_chat
    } = useContext(Chat_window);

    const [local_video,set_local_video] = useState(null);
    const [remote_video,set_remote_video] = useState(null);
    const [is_muted,set_is_muted] = useState(false);
    const [camera_facing_mode,set_camera_facing_mode] = useState(false);
    const [error,set_error] = useState(null);
    const [loading,set_loading] = useState(false);

    const peer_connection = useRef(null);

    const call_end = ()=> {
        socket?.emit('call_end',{to:user?._id === caller?._id ? callee?._id : caller?._id})
        close_peer_conecction();
    };

    const get_user_media = async ()=> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: call_type === 'video' ? { facingMode: camera_facing_mode  ? 'environment' : "user"} : false,
                audio: true
            });
    
            return stream;

        }
        catch (error) {
            console.log(error)
            call_end();
        }
    };

    const start_call = async ()=> {

        try {

           const stream = await get_user_media();

           if(!stream) {
            call_end();
            return
           };

            post_data('call',{
                callee,
                caller,
                type: call_type,
                call_status
            },
            set_loading,
            set_error)
            .then(async(data)=> {
                set_message( prev => ({...prev,call: data?._id}))
                if(data) {
                  handle_send_message(
                        message,
                        set_loading,
                        set_error,
                        set_chats,
                        active_chat,
                        set_active_chat,
                        socket
                    ).then((data)=> {
                        console.log(data)
                    })
                }
            });



            socket?.emit('call',{
                to: callee?._id,
                from: caller,
                type: call_type
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
            console.error(error);
            call_end();
            
        }

    };

    const answer_call = async ()=> {
        const stream = await get_user_media();

        if(!stream) {
            call_end();
            return;
        };
        set_local_video(stream);
        const pc = peer_connection.current;
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

    const close_peer_conecction = ()=> {
        if(local_video){
            local_video.getTracks().forEach(track=> track.stop());
        };
        if(peer_connection.current){
            peer_connection.current.close();
            peer_connection.current = null
        }

        set_local_video(null);
        set_remote_video(null);
        set_call_status('idle');
    }
    const toggle_mute = ()=> {
        const audio_track = local_video.getAudioTracks()[0];
        audio_track.enabled = !audio_track.enabled;

        set_is_muted(!audio_track.enabled);
    };

    const switch_camera = async()=> {

        const stream = await get_user_media();

        const new_stream = stream.getVideoTracks()[0];

        const sender = peer_connection.current.getSenders().find(s=> s.track.kind === 'video');

        if(sender) {
            await sender.replaceTrack(new_stream)
        };

        if(local_video){
            set_local_video(stream);
        }

}

    const toggle_camera_mode = async() => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const video_devices = devices.filter(d=> d.kind === 'videoinput')?.length;
        if(video_devices < 2) return;
        set_camera_facing_mode(!camera_facing_mode);
        switch_camera()
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
            socket?.emit('call_received',{to: caller?._id});
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
        });

        socket?.on('call_end',()=>{
            close_peer_conecction();
        });

        return ()=> {
            socket?.off('offer');
            socket?.off('answer');
            socket?.off('ice_candidate');
            socket?.off('call_end');
            close_peer_conecction();
        }

    },[]);

    return (
        <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-30 bg-gray-900">
            {
                call_status === 'call' ? 
                <Outgoing_call 
                   local_video={local_video}
                   on_end_call={call_end}
                   on_toggle_mute={toggle_mute}
                   is_muted={is_muted}
                /> :
                call_status === 'ringing'  ? 
                <Ringing_call
                   on_answer_call={answer_call}
                   on_end_call={call_end}
                 /> :
                call_status === 'connected'  && 
                <Connected_call
                   local_video={local_video}
                   remote_video={remote_video}
                   on_end_call={call_end}
                   on_toggle_mute={toggle_mute}
                   is_muted={is_muted}
                   on_toggle_camera_mode={toggle_camera_mode}
                 />
            }
        </div>
    );
};
