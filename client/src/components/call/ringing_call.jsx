
import { Call_context } from "../../contexts/call.context";
import { useContext} from "react";
import { MdCallEnd } from "react-icons/md";

export const Ringing_call = ({
    on_answer_call,
    on_end_call,
})=> {

    const {caller,call_type} = useContext(Call_context);


    return (
        <div className="flex flex-col items-center justify-center h-full min-h-full py-3">
            <div className="flex flex-col items-center justify-center text-gray-50">
                <img src={caller?.profile_picture} width={60} height={60} alt={caller?.name} className=" rounded-full" />
                <h5>{caller?.name}</h5>
                <p>{call_type} call</p>
            </div>
            <div className="w-auto h-screen"></div>
            <div className="flex items-center justify-center gap-5">
                <button onClick={on_answer_call} className="p-3 rounded-full text-white bg-emerald-400">
                    <MdCallEnd size={28} />
                </button>
                <button onClick={on_end_call} className="p-3 rounded-full text-red-500 bg-blue-50">
                    <MdCallEnd size={28} />
                </button>
            </div>
            <audio src="./ringing-call.mp3" hidden autoPlay loop />
        </div>
    );
};
