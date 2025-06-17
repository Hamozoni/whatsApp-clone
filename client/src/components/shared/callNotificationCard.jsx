import { SlCallOut } from "react-icons/sl";
import { SlCallIn } from "react-icons/sl";
import { RiVideoUploadLine } from "react-icons/ri";
import { RiVideoDownloadLine } from "react-icons/ri";
import { useContext} from "react";
import { User_context } from "../../contexts/user.context";

export const CallNotificationCard = ({call})=> {

    const {user} = useContext(User_context);
    const isMissedCall = call?.call_status === 'MISSED' && user?._id === call?.callee?._id;

    return (
        <div className={`flex items-center gap-2`}>
        {
              call?.type === 'AUDIO' ? 
            <>
              {
                user?._id === call?.caller ? 
                   <> 
                      <SlCallOut size={18} /> 
                      <h6 className="text-gray-400 capitalize text-sm font-medium">
                        outgoing audio call
                      </h6> 
                    </>
                    :
                   <> 
                      <SlCallIn 
                        size={18} 
                        className={isMissedCall && 'text-red-400'}
                        />  
                      <h6 className="text-gray-400 capitalize text-sm font-medium">
                        {isMissedCall ? 'missed audio call' : 'incoming audio call'} 
                      </h6>
                   </>
                } 
            </>
            : 
            <>
              { 
                user?._id === call?.caller ? 
                   <> 
                      <RiVideoUploadLine size={20} /> 
                      <h6 className="text-gray-400 capitalize text-sm font-medium">
                        outgoing video call
                      </h6>   
                    </>
                    : 
                    <>
                      <RiVideoDownloadLine 
                          size={20} 
                          className={isMissedCall && 'text-red-400'} 
                      /> 
                      <h6 className="text-gray-400 capitalize text-sm font-medium">
                        {isMissedCall ? 'missed video call' : 'incoming video call'} 
                      </h6>
                    </>
              } 
            </>
        }
    </div>
    )
}