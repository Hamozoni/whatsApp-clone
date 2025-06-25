import { CallContext } from "../../contexts/call.context";
import { useContext, useEffect, useRef, useState } from "react";
import { OutgoingCall } from "./outgoingCall";
import { RingingCall } from "./ringingCall";
import { ConnectedCall } from "./connectedCall";
import { UserContext } from "../../contexts/user.context";
import { postData } from "../../lib/postData";
import { handleSendMessage } from "../../lib/handleSendMessage";
import {ChatsContext } from "../../contexts/chats.context";
import { updateData } from "../../lib/updateData";

export const Call = ()=> {

    const {
        callStatus,
        setCallStatus,
        callee,
        caller,
        callType,
        callId,
        setCallId
    } = useContext(CallContext);

    const {socket,user,setChats} = useContext(UserContext);

    const {
        activeChat,
        setActiveChat,
        setMessages
    } = useContext(ChatsContext);

    const [localVideo,setLocalVideo] = useState(null);
    const [remoteVideo,setRemoteVideo] = useState(null);
    const [isMuted,setIsMuted] = useState(false);
    const [cameraFacingMode,setCameraFacingMode] = useState(false);
    const [error,setError] = useState(null);
    // const [loading,setLoading] = useState(false);

    const peerConnection = useRef(null);

    const endCall = async(callStatus,duration = 0)=> {

        socket?.emit('call_end',{to:user?._id === caller?._id ? callee?._id : caller?._id})
        await updateData('call',{call_status: callStatus,call_id: callId,duration});
        closePeerConecction();
    };

    const getUserMedia = async ()=> {
            return  await navigator.mediaDevices.getUserMedia({
                video: callType === 'video' ? { facingMode: cameraFacingMode  ? 'environment' : "user"} : false,
                audio: true
            });
    };

    const startCall = async ()=> {

        try {
           const stream = await getUserMedia();
            const {call} = await postData('call',{
                callee,
                caller,
                type: callType,
            });
            setCallId(call?._id);
            const message = {sender: user?._id,contact: callee?._id,call: call?._id,type: 'CALL'};

           await handleSendMessage({
                message,
                setChats,
                activeChat,
                setActiveChat,
                setMessages,
                socket}
            );

            socket?.emit('call',{
                to: callee?._id,
                from: caller,
                type: callType,
                call_id: call?._id
            });

            setLocalVideo(stream);

            const pc = new RTCPeerConnection({
                iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
                iceCandidatePoolSize: 10
            });

            peerConnection.current = pc;

            stream.getTracks().forEach(track=> {
                pc.addTrack(track,stream);
            });

            pc.ontrack = (e)=> {
                setRemoteVideo(e.streams[0])
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

            console.log(error)
            setError(error.message)
            
        }

    };

    const answerCall = async ()=> {
        const stream = await getUserMedia();

        if(!stream) {
            endCall();
            return;
        };
        setLocalVideo(stream);
        const pc = peerConnection.current;
        stream.getTracks().forEach(track=> {
            if(pc) {
                pc.addTrack(track,stream);
            };
        });

        const answer = await pc.createAnswer();

        pc.setLocalDescription(answer);

        socket?.emit('answer',{to: caller?._id,data:answer});
        setCallStatus('connected');
    };

    const closePeerConecction = ()=> {
        if(localVideo){
            localVideo.getTracks().forEach(track=> track.stop());
        };
        if(peerConnection.current){
            peerConnection.current.close();
            peerConnection.current = null
        }

        setLocalVideo(null);
        setRemoteVideo(null);
        setCallStatus('idle');
    }
    const toggleMute = ()=> {
        const audioTrack = localVideo.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;

        setIsMuted(!audioTrack.enabled);
    };

    const switchCamera = async()=> {

        const stream = await getUserMedia();

        const newStream = stream.getVideoTracks()[0];

        const sender = peerConnection.current.getSenders().find(s=> s.track.kind === 'video');

        if(sender) {
            await sender.replaceTrack(newStream)
        };

        if(localVideo){
            setLocalVideo(stream);
        }

}

    const toggleCameraMode = async() => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d=> d.kind === 'videoinput')?.length;
        if(videoDevices < 2) return;
        setCameraFacingMode(!cameraFacingMode);
        switchCamera()
    }

    useEffect(()=> {
        if(user?._id === caller?._id) {
            startCall();
        };
        socket?.on('offer',async ({data})=> {

            const pc = new RTCPeerConnection({
                iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
                iceCandidatePoolSize: 10
            });

            peerConnection.current = pc;

            pc.ontrack = (e)=> {
                setRemoteVideo(e.streams[0])
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
            peerConnection.current.setRemoteDescription(data);
            setCallStatus('connected')
        });

        socket?.on('ice_candidate', async ({data})=> {
            try {
                await peerConnection.current.addIceCandidate(data)
            }
            catch (error) {
                console.error(error)
            }
        });

        socket?.on('call_end',()=>{
            closePeerConecction();
        });

        return ()=> {
            socket?.off('offer');
            socket?.off('answer');
            socket?.off('ice_candidate');
            socket?.off('call_end');
            closePeerConecction();
        }

    },[]);

    return (
        <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-30 bg-gray-900">
            {
                callStatus === 'call' ? 
                <OutgoingCall 
                   localVideo={localVideo}
                   onEndCall={endCall}
                   onToggleMute={toggleMute}
                   isMuted={isMuted}
                   callEnd= {endCall}
                /> :
                callStatus === 'ringing'  ? 
                <RingingCall
                   onAnswerCall={answerCall}
                   onEndCall={endCall}
                 /> :
                callStatus === 'connected'  && 
                <ConnectedCall
                   localVideo={localVideo}
                   remoteVideo={remoteVideo}
                   onEndCall={endCall}
                   onToggleMute={toggleMute}
                   isMuted={isMuted}
                   onToggleCameraMode={toggleCameraMode}
                 />
            }
        </div>
    );
};
