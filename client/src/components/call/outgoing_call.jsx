import { useContext, useEffect, useRef, useState} from "react";
import { MdCallEnd } from "react-icons/md";
import { Call_context } from "../../contexts/call.context";
import { FaMicrophoneSlash, FaVideo } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { User_context } from "../../contexts/user.context";

export const Outgoing_call = ({
    local_video,
    on_end_call,
    on_toggle_mute,
    is_muted,
    call_end
  })=> {

    const interval_ref = useRef(null);
    const {callee} = useContext(Call_context);
    const {socket} = useContext(User_context);
    const [is_call_received,set_is_call_received] = useState(false)
    const local_video_ref = useRef(null)

    useEffect(()=> {
        if(local_video && local_video_ref.current) {
            local_video_ref.current.srcObject = local_video
        }
    },[local_video]);

    useEffect(()=> {
        socket?.on('call_received',()=>{
            set_is_call_received(true)
        });

        interval_ref.current = setInterval(()=> {
            call_end()
        },[3000])

        return ()=> {
            socket?.off('call_received');
            clearInterval(interval_ref.current)
        }
    },[]);


    return (
        <div className=" relative flex flex-col items-center justify-center h-full min-h-full">
            <div className="flex flex-col items-center justify-center text-gray-50 absolute top-3 left-1/2 -translate-x-1/2 z-40">
                <h5>{callee?.name}</h5>
                <p>{is_call_received ? 'ringing...': 'calling...'}</p>
            </div>
            <video 
                className="w-auto h-screen object-cover" 
                ref={local_video_ref} 
                autoPlay 
                muted
                />
            <div className="absolute w-fit bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-3 bg-[#ffffff2f] p-2 rounded-xl">
                <button onClick={on_toggle_mute} className={`${is_muted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <FaMicrophoneSlash size={28} />
                </button>
                <button onClick={on_toggle_mute} className={`${is_muted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <HiSpeakerWave size={28} />
                </button>
                <button onClick={on_toggle_mute} className={`${is_muted ? 'text-red-500 bg-[#ffffff46]' : 'text-blue-50 bg-[#0000001f]'} p-3 rounded-full `}>
                    <FaVideo size={28} />
                </button>
                <button onClick={on_end_call} className="p-3 rounded-full text-red-500 bg-blue-50 ">
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./outgoing-call.mp3" hidden autoPlay loop />
        </div>
    )
}