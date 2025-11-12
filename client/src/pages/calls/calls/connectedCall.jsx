import { useContext, useEffect, useRef, useState } from "react";

import { CallContext,UserContext } from "../../../contexts/index";

import { MdCallEnd } from "react-icons/md";
import { RiCameraSwitchLine } from "react-icons/ri";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";

import { callTimeFormater } from "../../../lib/callTimeFormater";

const f = 'w-full h-full';
const h = 'absolute top-2 left-2 z-30 max-w-[100px] rounded-md  min-h-[150px] md:min-h-[250px] md:max-w-[200px]'

export const ConnectedCall = ({
    localVideo,
    remoteVideo,
    onEndCall,
    onToggleMute,
    isMuted,
    onToggleCameraMode,
})=> {

    const {
        callee,
        caller,
        callType
    } = useContext(CallContext);

    const {user} = useContext(UserContext);

    const [isLocalVideoFullScreen,setIsLocalVideoFullScreen] = useState(false);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [callTimer,setCallTimer] = useState(0);
    const intervalRef = useRef(null)

    useEffect(()=>{
        if(localVideo && localVideoRef.current) {
            localVideoRef.current.srcObject = localVideo
        }
        if(remoteVideo && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteVideo
        }
    },[localVideo,remoteVideo]);

    useEffect(()=> {
        intervalRef.current = setInterval(() => {
            setCallTimer(prev => prev + 1);
        }, 1000);

        return ()=> clearInterval(intervalRef.current);
    },[]);

    return (
        <div className="relative h-screen min-h-screen">
            <div className="flex flex-col items-center justify-center text-gray-50 absolute top-3 left-1/2 -translate-x-1/2 z-40">
                <h5>{callee?._id === user?._id ? caller?.name : callee?.name}</h5>
                <p>{callTimeFormater(callTimer)}</p>
            </div>
            <div className="relative w-fit mx-auto h-full min-h-screen">
                <div className={isLocalVideoFullScreen ? f : h} >
                    <div className="relative w-full h-full">
                        <video 
                            onClick={()=> setIsLocalVideoFullScreen(true)} 
                            className='h-full w-full min-w-full min-h-full object-cover'
                            autoPlay muted
                            ref={localVideoRef}
                            />
                        {
                            callType === 'video' && 
                            <button 
                                onClick={onToggleCameraMode} 
                                className={`${isLocalVideoFullScreen ? 'top-3 right-3 p-3 ' : 'top-1 right-1 p-1 '} absolute rounded-full text-blue-50 bg-[#0000001f]`}>
                                <RiCameraSwitchLine size={isLocalVideoFullScreen ? 28 : 18}  />
                            </button>
                        }
                    </div>
                </div>
                <div className={isLocalVideoFullScreen ? h : f}>
                    <video 
                        onClick={()=> setIsLocalVideoFullScreen(false)} 
                        className='h-full w-full min-w-full min-h-full object-cover' 
                        ref={remoteVideoRef}
                        autoPlay 
                        />

                </div>
            </div>
            <div className="absolute w-fit bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-3 bg-[#ffffff2a] p-2 rounded-xl">
                <button onClick={() => onEndCall('ACCEPTED',callTimer)} className="p-3 rounded-full text-red-500 bg-blue-50 ">
                    <MdCallEnd size={28} />
                </button>
                <button onClick={onToggleMute} className={`${isMuted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <FaMicrophoneSlash size={28} />
                </button>
                <button onClick={onToggleMute} className={`${isMuted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <HiSpeakerWave size={28} />
                </button>
                <button onClick={onToggleMute} className={`${isMuted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <FaVideo size={28} />
                </button>
            </div>
        </div>
    );
};