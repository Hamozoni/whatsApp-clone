
const NoActiveChat = ()=> {
    return (
        <div className="text-[#f7f8fa] flex-1 rounded-lg mr-1 bg-[#162127]">
            <div className="flex flex-col justify-center items-center h-full max-h-full">
                <img 
                    src={'/chat_window.png'} 
                    width={300} 
                    height={300} 
                    alt='chat window' 
                    />
                <div className="text-center mt-6 max-w-[500px]">
                    <h4 className='text-3xl font-light'>
                        download WhatsApp for Windows
                    </h4>
                    <p className='text-center text-sm font-light mt-4'>
                        Make calls, share your screen and get a faster experience when you download the Windows app.
                    </p>
                </div>
            </div>
        </div>
    )
};

export default NoActiveChat;