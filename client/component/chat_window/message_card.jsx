

export const Message_card = ({user_id,message})=> {

    const is_my_message = message?.sender?.id === user_id;

    return (
        <div
            className={`flex ${is_my_message ? 'justify-end' : 'justify-start'}`}
        >
            <div
            className={`max-w-[65%] rounded-lg p-3 relative ${
                is_my_message
                ? 'bg-emerald-800  ml-12'
                : 'bg-[#222e35] mr-12'
            }`}
            style={{
                boxShadow: '0 1px 0.5px rgba(11,20,26,.13)'
            }}
            >
            <p className="text-sm">{message?.text}</p>
            <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-[10px] ">
                    {message?.created_at}
                </span>
                {is_my_message && (
                <span className="text-[10px]">
                    {message?.status === 'READ' ? '✓✓' : message?.status === 'DELIVERED' ? '✓' : '◷'}
                </span>
                )}
            </div>
            </div>
        </div>
    )
}