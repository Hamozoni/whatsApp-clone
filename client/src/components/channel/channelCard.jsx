import { Avatar } from "../ui/avatar";

export const ChannelCard = ({channel})=> {

    return (

        <div className=" flex items-center gap-3 cursor-pointer rounded-md hover:bg-gray-700 my-1 p-3">
            <Avatar size='lg' user_photo={channel.avatar.url}/>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className=" text-gray-100 text-lg font-medium">{channel?.name}</h4>
                    <span className="text-gray-400 text-sm">
                        7:30
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <p className=" line-clamp-1 text-gray-400 text-sm font-medium">
                        {
                            channel?.last_message ? (
                                'last message'
                            ) : (
                                'you created this channel'
                            )
                        }
                    </p>
                    <span className="bg-emerald-400 rounded-full w-5 min-w-5 h-5 flex justify-center items-center">
                        5
                    </span>
                </div>
            </div>
        </div>
    )
}