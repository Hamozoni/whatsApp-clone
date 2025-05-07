import { SlCallOut } from "react-icons/sl";
import { SlCallIn } from "react-icons/sl";
import { RiVideoUploadLine } from "react-icons/ri";
import { RiVideoDownloadLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { User_context } from "../../contexts/user.context";

export const Call_card = ({message})=> {

    const {user} = useContext(User_context);
    const [is_missed_call,set_is_missed_call] = useState(false);

    useEffect(()=> {
        set_is_missed_call(message?.call?.call_status === 'MISSED' && user?._id === message?.call?.callee)
    },[]);

    return (
        <div className={`flex items-center gap-1`}>
        {
            message?.call?.type === 'AUDIO' ? 
            <>
              {
                user?._id === message?.call?.caller ? 
                   <> <SlCallOut size={12} /> <span>outgoing audio call</span>  </>
                    :
                   <> <SlCallIn size={12} className={is_missed_call && 'text-red-400'} />  
                      <span>{is_missed_call ? 'missed audio call' : 'incoming audio call'} </span>
                   </>
                } 
            </>
            : 
            <>
              { 
                user?._id === message?.call?.caller ? 
                   <> <RiVideoUploadLine size={20} /> <span>outgoing video call</span>   </>
                    : 
                    <>
                        <RiVideoDownloadLine size={20} className={is_missed_call && 'text-red-400'} /> 
                         <span>{is_missed_call ? 'missed video call' : 'incoming video call'} </span>
                    </>
              } 
            </>
        }
    </div>
    )
}