
import { CallContext } from "../../../contexts/call.context";
import { useContext} from "react";
import { MdCallEnd } from "react-icons/md";

export const RingingCall = ({
    onAnswerCall,
    onEndCall,
})=> {

    const {caller,callType} = useContext(CallContext);


    return (
        <div className="flex flex-col items-center justify-center h-full min-h-full py-3">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <img src={caller?.profile_picture} width={60} height={60} alt={caller?.name} className=" rounded-full" />
                <h5>{caller?.name}</h5>
                <p>{callType} call</p>
            </div>
            <div className="w-auto h-screen"></div>
            <div className="flex items-center justify-center gap-5">
                <button onClick={onAnswerCall} className="p-3 rounded-full text-white bg-emerald-400">
                    <MdCallEnd size={28} />
                </button>
                <button onClick={()=> onEndCall('REJECTED',0)} className="p-3 rounded-full text-red-500 bg-blue-50">
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./ringing-call.mp3" hidden autoPlay loop />
        </div>
    );
};
