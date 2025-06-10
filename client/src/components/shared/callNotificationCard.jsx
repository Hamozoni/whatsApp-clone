import { SlCallOut } from "react-icons/sl";
import { SlCallIn } from "react-icons/sl";
import { RiVideoUploadLine } from "react-icons/ri";
import { RiVideoDownloadLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { User_context } from "../../contexts/user.context";

export const CallNotificationCard = ({call})=> {

    const {user} = useContext(User_context);
    const [isMissedCall,setIsMissedCall] = useState(false);

    useEffect(()=> {
        setIsMissedCall(call?.call_status === 'MISSED' && user?._id === call?.callee?._id)
    },[]);

    return (
        <div className={`flex items-center gap-1`}>
        {
              call?.type === 'AUDIO' ? 
            <>
              {
                user?._id === call?.caller ? 
                   <> <SlCallOut size={12} /> <span className="text-[#667781] capitalize text-sm font-medium">outgoing audio call</span>  </>
                    :
                   <> <SlCallIn size={12} className={isMissedCall && 'text-red-400'} />  
                      <span className="text-[#667781] capitalize text-sm font-medium">{isMissedCall ? 'missed audio call' : 'incoming audio call'} </span>
                   </>
                } 
            </>
            : 
            <>
              { 
                user?._id === call?.caller ? 
                   <> <RiVideoUploadLine size={20} /> <span className="text-[#667781] capitalize text-sm font-medium">outgoing video call</span>   </>
                    : 
                    <>
                        <RiVideoDownloadLine size={20} className={isMissedCall && 'text-red-400'} /> 
                         <span className="text-[#667781] capitalize text-sm font-medium">{isMissedCall ? 'missed video call' : 'incoming video call'} </span>
                    </>
              } 
            </>
        }
    </div>
    )
}