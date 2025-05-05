
export const No_active_chat = ()=> {
    return (
        <div className="text-[#f7f8fa] flex-1 hide_model">
            <div className="flex flex-col justify-center items-center bg-[#111b21] h-screen hide_model">
                <img src={'/chat_window.png'} width={300} height={300} alt='chat window' />
                <div className="text-center mt-6 max-w-[500px] hide_model">
                    <h4 className='text-3xl font-light hide_model'>download WhatsApp for Windows</h4>
                    <p className='text-center text-sm font-light mt-4 hide_model'>Make calls, share your screen and get a faster experience when you download the Windows app.</p>
                </div>
            </div>
        </div>
    )
}