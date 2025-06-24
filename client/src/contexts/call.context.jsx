import { Call } from "../components/calls/call";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user.context";


export const Call_context = createContext(null);


export const Call_context_provider = ({children})=> {

    const {socket} = useContext(UserContext);

    const [call_status,set_call_status] = useState('idle');
    const [call_type,set_call_type] = useState('video');
    const [callee,set_callee] = useState(null);
    const [caller,set_caller] = useState(null);
    const [call_id,set_call_id] = useState(null)

    useEffect(()=> {
        console.log(socket)
        if(!socket) return
        socket.on('call',({from,type,call_id})=> {
            set_caller(from);
            set_call_type(type);
            set_call_id(call_id)
            set_call_status('ringing');

            console.log({from,type,call_id})
        });

        return ()=> socket?.off('call');
    },[socket]);


    return (
        <Call_context.Provider
            value={{
                callee,
                set_callee,
                caller,
                set_caller,
                call_status,
                set_call_status,
                call_type,
                set_call_type,
                call_id,set_call_id
            }} 
           >
            {children}
            {
                call_status !== 'idle' && <Call />
            }
        </Call_context.Provider>
    )
}

