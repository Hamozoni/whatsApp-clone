import { useContext } from "react"
import { User_context } from "../../contexts/user.context"
import { Avatar } from "../ui/avatar";


export const ChannelsContainer = ()=> {

    const {channels} = useContext(User_context);

    return (
        <div className="py-3 flex-1 max-w-full overflow-y-auto">
            {
                channels?.map((channel)=> (
                    <div key={channel?._id} className=" flex items-center gap-3 cursor-pointer rounded-md hover:bg-gray-700 my-1 p-3">
                        <Avatar size='lg' user_photo={channel.avatar.url}/>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className=" text-gray-100 text-lg font-medium">{channel?.name}</h4>
                                <span className="text-gray-400 text-sm">7:30</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className=" line-clamp-1 text-gray-400 text-sm font-medium">يتعهد طالب الزيارة بصحة المعلومات المدونة ومغادرة الشخص المطلوب قبل انتهاء المدة المحددة للزيارة</p>
                                <span className="bg-emerald-400 rounded-full w-5 min-w-5 h-5 flex justify-center items-center">5</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}