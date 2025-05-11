import { Chat_window_context } from "../../contexts/chat_window.context";
import { useContext } from "react";
import { Files_gallery } from "../ui/files_gallery";


export const Media_gallery = ()=> {

    const {
        messages,
        selected_gallery_file,
        set_selected_gallery_file,
        set_is_gallery_file
    } = useContext(Chat_window_context);

    const handle_close_media = (e)=> {
        console.log(e.target.classList.contains('parent'))
        if(e.target.classList.contains('parent')){
            set_is_gallery_file(false)
        }
    };
    
    return (
        <div 
            onClick={handle_close_media} 
            className=" fixed top-0 left-0 w-screen h-screen bg-[#000000ef] z-30 parent flex flex-col justify-between"
            >
            <header className="flex items-center justify-between h-[70px] bg-black">
                <div className=""></div>
                <div className=""></div>
            </header>
            <Files_gallery file_data={selected_gallery_file} />
            <footer className="border-t-[1px] border-b-cyan-950 bg-black p-2 max-full overflow-x-auto min-h-fit">
                <div className="flex justify-center items-center min-w-fit gap-2 ">
                    {
                        messages?.map((message)=> (
                           ( message?.type === 'MEDIA' && message?.file?.type !== 'AUDIO' ) && (
                                <div 
                                   
                                    key={message?._id} 
                                    className={`relative rounded-xl cursor-pointer overflow-hidden border-4 border-cyan-950 h-[70px] w-[70px] flex justify-center items-center ${selected_gallery_file?._id === message?.file?._id && 'scale-75 border-cyan-400'}`}
                                    >
                                     <Files_gallery file_data={message?.file} is_blob={false} />
                                     <button 
                                      onClick={()=> set_selected_gallery_file(message?.file)}
                                     className=" absolute left-0 top-0 w-full h-full z-30"></button>
                                </div>
                            )
                        ))
                    }
                </div>
            </footer>
        </div>
    )
}