import { MediaMessageCard } from './mediaMessageCard'
import { CallNotificationCard } from "../shared/callNotificationCard";
import { timeFormat } from "../../lib/timeFormat";

export const MessageCard = ({userId,message})=> {

    return (
        <div className={`flex ${message?.sender?._id === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col rounded-lg py-2 px-3 min-w-12 border-2 max-w-[85%] mb-3  ${
                    message?.sender?._id === userId 
                    ? 'bg-emerald-700 border-emerald-800'
                    : 'bg-[#222e35] border-gray-700 '
                    }`}
                >
                <div >
                    {
                        message.type === 'MEDIA' ?
                            <MediaMessageCard 
                                sender={message?.sender} 
                                file={message?.file}
                                />
                        : message.type === 'CALL' && 
                            <div className="rounded-lg cursor-pointer">
                                <CallNotificationCard call={message?.call} />
                            </div>
                    }
                    {
                        (message.type === 'MEDIA' || message?.file?.type === 'AUDIO' || message.type === 'CALL') ? '':
                        <p className="text-sl p-2 font-medium">
                            { message?.file?.type === 'APPLICATION' ? message?.file?.name : message?.text}
                        </p>
                    }

                </div>
                <div className={`flex flex-1  gap-1 mt-1 justify-end`}>
                    <span className="text-[0.6rem] text-gray-300 font-bold">
                        {timeFormat(message?.createdAt)}
                    </span>
                    {(message?.sender?._id === userId  && message.type !== 'CALL') &&(
                    <span className={`${message?.status === 'READ' ? 'text-emerald-300' :'text-gray-300'} text-xs`}>
                        {message?.status === 'SENT' ? '✓' : '✓✓'}
                    </span>
                    )}
                </div>
            </div>
        </div>
    )
}