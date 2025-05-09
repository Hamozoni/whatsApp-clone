import { useContext } from "react"
import { User_context } from "../../contexts/user.context";
import { GrFormAdd } from "react-icons/gr";


export const Status = ()=> {

    const {user} = useContext(User_context)
    return (
        <div className="flex h-dvh">
            <div className="p-3 flex-1 border-r border-cyan-950">
                <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold mb-3">Status</h4>
                    <button className="rounded-full border border-white">
                        <GrFormAdd size={20}/>
                    </button>
                </div>
                <div className="flex gap-2 cursor-pointer">
                    <div className="relative">
                        <img 
                            src={user?.profile_picture} 
                            alt="avatar" 
                            className="w-11 h-11 rounded-full"
                            />
                            <button className=" absolute right-0 bottom-0 rounded-full border border-cyan-950 bg-emerald-500">
                                <GrFormAdd />
                            </button>
                    </div>
                    <div className="">
                        <h5 className="m-0">My status</h5>
                        <span className="text-xs">Click to add status update</span>
                    </div>
                </div>
            </div>
            <div className="flex-2"></div>
        </div>
    )
}