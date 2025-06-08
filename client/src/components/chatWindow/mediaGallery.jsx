import {ChatsContext } from "../../contexts/chats.context";
import { useContext } from "react";
import { MediaGalleryFile } from "./mediaGalleryFile";


export const MediaGallery = ()=> {

    const {
        messages,
        selectedGalleryFile,
        setSelectedGalleryFile,
        setIsSelectedGalleryFile
    } = useContext(ChatsContext);

    const handleCloseMedia = (e)=> {
        console.log(e.target.classList.contains('parent'))
        if(e.target.classList.contains('parent')){
            setIsSelectedGalleryFile(false)
        }
    };
    
    return (
        <div 
            onClick={handleCloseMedia} 
            className=" fixed top-0 left-0 w-screen h-screen bg-[#000000ef] z-30 parent flex flex-col justify-between"
            >
            <header className="flex items-center justify-between h-[70px] bg-black">
                <div className=""></div>
                <div className=""></div>
            </header>
            <MediaGalleryFile fileData={selectedGalleryFile} />
            <footer className="border-t-[1px] border-b-cyan-950 bg-black p-2 max-full overflow-x-auto min-h-fit">
                <div className="flex justify-center items-center min-w-fit gap-2 ">
                    {
                        messages?.map((message)=> (
                           ( message?.type === 'MEDIA' && message?.file?.type !== 'AUDIO' ) && (
                                <div 
                                   
                                    key={message?._id} 
                                    className={`relative rounded-xl cursor-pointer overflow-hidden border-4 border-cyan-950 h-[70px] w-[70px] flex justify-center items-center ${selectedGalleryFile?._id === message?.file?._id && 'scale-75 border-cyan-400'}`}
                                    >
                                     <MediaGalleryFile fileData={message?.file} isBlob={false} />
                                     <button 
                                      onClick={()=> setSelectedGalleryFile(message?.file)}
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