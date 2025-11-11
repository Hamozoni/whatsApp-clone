import { Call } from "../components/calls/call";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user.context";


export const CallContext = createContext(null);


const CallContextProvider = ({children})=> {

    const {socket} = useContext(UserContext);

    const [callStatus,setCallStatus] = useState('idle');
    const [callType,setCallType] = useState('video');
    const [callee,setCallee] = useState(null);
    const [caller,setCaller] = useState(null);
    const [callId,setCallId] = useState(null)

    useEffect(()=> {
        console.log(socket)
        if(!socket) return
        socket.on('call',({from,type,call_id})=> {
            setCaller(from);
            setCallType(type);
            setCallId(call_id)
            setCallStatus('ringing');
        });

        return ()=> socket?.off('call');
    },[socket]);


    return (
        <CallContext.Provider
            value={{
                callee,
                setCallee,
                caller,
                setCaller,
                callStatus,
                setCallStatus,
                callType,
                setCallType,
                callId,
                setCallId
            }} 
           >
            {children}
            {
                callStatus !== 'idle' && <Call />
            }
        </CallContext.Provider>
    )
};

export default CallContextProvider;

