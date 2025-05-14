import { useState } from "react"
import { StatusAvatarRing } from "./statusAvatarRing"
import { StatusPreview } from "./statusPreview"

export const StatusCard = ({status,length})=> {

    const [isStatus,setIsStatus] = useState(false);

    return (
        <div 
            onClick={()=> setIsStatus(true)} 
            className="flex items-center gap-2 cursor-pointer hover:bg-cyan-950 p-2 rounded-md">
                <StatusAvatarRing 
                    status={status}  
                    statusCount={length} 
                    />
                
                <div className="">
                    <h6>{status[0]?.user?.name}</h6>
                    <p className="text-xs text-gray-400"> Today at {new Date(status[length - 1]?.createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'}) }</p>
                </div>
                {
                    isStatus && 
                    <StatusPreview setIsStatus={setIsStatus} status={status} />
                }
        </div>
    )
}