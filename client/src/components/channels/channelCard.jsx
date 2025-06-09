import { Avatar } from "../ui/avatar";

export const ChannelCard = ({channel})=> {

    return (

        <div className=" flex items-center gap-3 cursor-pointer rounded-md hover:bg-[#213036] my-1 p-3">
            <Avatar size='lg' user_photo={channel.avatar.url}/>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h6 >
                        {channel?.name}
                    </h6>
                    <span className="text-gray-400 text-sm">
                         {
                            channel?.last_message ? (
                                '7:30'
                            ) : (
                                '9:00'
                            )
                        }
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <p className=" line-clamp-1 text-gray-400 text-sm font-light">
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