import { Status_avatar_ring } from "./status_avatar_ring"

export const Status_card = ({status,length})=> {
    return (
        <div className="flex items-center gap-2 cursor-pointer hover:bg-cyan-950 p-2 rounded-md">
                {
                    status[length - 1].type === 'TEXT' && 
 

                    <Status_avatar_ring 
                        status={status}  
                        status_count={length} 
                        />
                }
                <div className="">
                    <h6>{status[length - 1].user.name}</h6>
                    <p className="text-xs text-gray-400"> Today at {new Date(status[length - 1].createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'}) }</p>
                </div>
        </div>
    )
}