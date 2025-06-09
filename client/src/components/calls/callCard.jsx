import { timeFormat } from "../../lib/timeFormat"
import { Call_card } from "../chats/call_card"
import { Avatar } from "../ui/avatar"

export const CallCard = ({call,userId})=> {
    return (
        <div className="flex gap-2 my-1 cursor-pointer rounded-md p-3 hover:bg-[#213036] w-full mb-2">
            <Avatar size="lg" user_photo={call?.profile_picture}/>
            <div className=" flex-1">
                <div className="flex items-center justify-between">
                    <h6>{call?.caller?._id === userId ?  call?.callee?.name : call?.caller?.name}</h6>
                    <span className="text-xs text-[#667781]">
                        {timeFormat(call?.createdAt || call?.updatedAt)}
                    </span>
                </div>
                <Call_card call={call} />
            </div>
        </div>
    )
}