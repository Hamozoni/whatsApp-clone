import { useContext } from "react"
import { User_context } from "../../contexts/user.context"


export const Status = ()=> {

    const {user} = useContext(User_context)
    return (
        <div className="flex h-dvh">
            <div className="p-3 flex-1 border-r border-cyan-950">
                <h4 className="text-xl font-bold mb-3">Status</h4>
                <div className="flex gap-2">
                    <img 
                        src={user?.profile_picture} 
                        alt="avatar" 
                        className="w-11 h-11 rounded-full"
                        />
                    <div className="">
                        <h5 className="m-0">My status</h5>
                        <span className="text-xs">no updates</span>
                    </div>
                </div>
            </div>
            <div className="flex-2"></div>
        </div>
    )
}