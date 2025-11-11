import { useState } from "react"
import { StatusAvatarRing } from "./statusAvatarRing"
import { StatusPreview } from "../statusPreivew/statusPreview"
import { timeFormat } from "../../lib/timeFormat";

export const StatusCard = ({status,length})=> {

    const [isStatus,setIsStatus] = useState(false);

    return (
        <div 
            onClick={()=> setIsStatus(true)} 
            className="flex items-center gap-3 cursor-pointer border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31] p-2 rounded-lg">
                <StatusAvatarRing 
                    status={status}  
                    statusCount={length} 
                    />
                
                <div className="">
                    <h6>{status[0]?.user?.name}</h6>
                    <p className="text-xs text-gray-400"> Today at {timeFormat(status[length - 1]?.createdAt)}</p>
                </div>
                {
                    isStatus && 
                    <StatusPreview setIsStatus={setIsStatus} status={status} />
                }
        </div>
    )
}