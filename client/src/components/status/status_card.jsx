import { useState } from "react"
import { Status_avatar_ring } from "./status_avatar_ring"
import { Status_preview } from "./status_preview"

export const Status_card = ({status,length})=> {

    const [is_status,set_is_status] = useState(false)
    return (
        <div 
            onClick={()=> set_is_status(true)} 
            className="flex items-center gap-2 cursor-pointer hover:bg-cyan-950 p-2 rounded-md">
                <Status_avatar_ring 
                    status={status}  
                    status_count={length} 
                    />
                
                <div className="">
                    <h6>{status[0]?.user?.name}</h6>
                    <p className="text-xs text-gray-400"> Today at {new Date(status[length - 1]?.createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'}) }</p>
                </div>
                {
                    is_status && 
                    <Status_preview set_is_status={set_is_status} status={status} />
                }
        </div>
    )
}