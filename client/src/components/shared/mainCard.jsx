import { timeFormat } from "../../lib/timeFormat"
import { Avatar } from "../ui/avatar"

export const MainCard = ({children,avatarUrl,name,time})=>  {
    return (
        <div className="flex items-center gap-3 cursor-pointer rounded-lg px-3 border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31] w-full">
            <Avatar size="lg" user_photo={avatarUrl}/>
            <div className=" flex-1 py-3 border-b border-b-[#213036]">
                <div className="flex items-center justify-between">
                    <h6>{name}</h6>
                    <span className="text-xs text-[#667781]">
                        {timeFormat(time)}
                    </span>
                </div>
                {children}
            </div>
        </div>
    )
}