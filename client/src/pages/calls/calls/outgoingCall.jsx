import { useContext, useEffect, useRef, useState} from "react";
import { MdCallEnd } from "react-icons/md";
import { CallContext } from "../../contexts/call.context";
import { FaMicrophoneSlash, FaVideo } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { UserContext } from "../../contexts/user.context";

export const OutgoingCall = ({
    localVideo,
    onEndCall,
    onToggleMute,
    isMuted,
    callEnd
  })=> {

    const intervalRef = useRef(null);
    const {callee} = useContext(CallContext);
    const {socket} = useContext(UserContext);
    const [isCallReceived,setIsCallReceived] = useState(false)
    const localVideoRef = useRef(null)

    useEffect(()=> {
        if(localVideo && localVideoRef.current) {
            localVideoRef.current.srcObject = localVideo
        }
    },[localVideo]);

    useEffect(()=> {
        socket?.on('call_received',()=>{
            setIsCallReceived(true)
        });

        intervalRef.current = setInterval(()=> {
            callEnd()
        },[30000])

        return ()=> {
            socket?.off('call_received');
            clearInterval(intervalRef.current)
        }
    },[]);


    return (
        <div className=" relative flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50 absolute top-3 left-1/2 -translate-x-1/2 z-40">
                <h5>{callee?.name}</h5>
                <p>{isCallReceived ? 'ringing...': 'calling...'}</p>
            </div>
            <video 
                className="w-auto h-screen object-cover" 
                ref={localVideoRef} 
                autoPlay 
                muted
                />
            <div className="absolute w-fit bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-3 bg-[#ffffff2f] p-2 rounded-xl">
                <button onClick={onToggleMute} className={`${isMuted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <FaMicrophoneSlash size={28} />
                </button>
                <button onClick={onToggleMute} className={`${isMuted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <HiSpeakerWave size={28} />
                </button>
                <button onClick={onToggleMute} className={`${isMuted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <FaVideo size={28} />
                </button>
                <button onClick={()=>onEndCall('MISSED')} className="p-3 rounded-full text-red-500 bg-blue-50 ">
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./outgoing-call.mp3" hidden autoPlay loop />
        </div>
    )
}