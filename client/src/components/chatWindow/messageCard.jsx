import { MediaMessageCard } from './mediaMessageCard'
import { CallNotificationCard } from "../shared/callNotificationCard";
import { timeFormat } from "../../lib/timeFormat";

export const MessageCard = ({userId,message})=> {

    return (
        <div className={`flex ${message?.sender?._id === userId ? 'justify-end' : 'justify-start'}`}>
            <div className='max-w-[70%] mb-3' >
                <div className={`rounded-lg min-w-12 border-2  ${
                        message?.sender?._id === userId 
                        ? 'bg-emerald-800 border-emerald-700'
                        : 'bg-[#222e35] border-gray-700 '
                    }`}
                   >
                    {
                        message.type === 'MEDIA' ?
                            <MediaMessageCard 
                                sender={message?.sender} 
                                file={message?.file}
                                />
                        : message.type === 'CALL' && 
                            <div className="p-3 rounded-lg cursor-pointer">
                                <CallNotificationCard call={message?.call} />
                            </div>
                    }
                    {
                        (message.type === 'MEDIA' || message?.file?.type === 'AUDIO' || message.type === 'CALL') ? '':
                        <p className="text-sm p-2">
                            { message?.file?.type === 'APPLICATION' ? message?.file?.name : message?.text}
                        </p>
                    }

                </div>
                <div className={`flex items-center justify-end gap-1 mt-1 ${message?.sender?._id === userId  ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[0.7rem] text-gray-400">
                        {timeFormat(message?.createdAt)}
                    </span>
                    {(message?.sender?._id === userId  && message.type !== 'CALL') &&(
                    <span className={`${message?.status === 'READ' ? 'text-emerald-300' :'text-gray-400'} text-sm`}>
                        {message?.status === 'SENT' ? '✓' : '✓✓'}
                    </span>
                    )}
                </div>
            </div>
        </div>
    )
}