import { ChatsContext } from "../../contexts/chats.context";
import { useContext} from "react"
import{ ChatMessages} from "./chatMessages";
import { ChatHeader } from "./chatHeader";
import { ChatFooter } from "./chatFooter";
import { FilesPreview } from "./filesPreview";
import { MediaGallery } from "./mediaGallery";
import { MediaCapture } from "./mediaCapture";


export const ChatWindow = ()=> {

    const {
        isPreview, 
        activeChat,
        isSelectedGalleryFile,
        isCamera
    } = useContext(ChatsContext);

    return (

            <div className="text-[#f7f8fa] flex-1 h-dvh max-h-dvh">
                <div className=" h-screen flex flex-col max-h-full">
                   <ChatHeader receiver={activeChat?.contact}/>
                   {
                      isPreview ?
                      <FilesPreview />
                    
                   : isCamera ?
                    <MediaCapture />
                      : <ChatMessages />
                   }
                   {
                    isCamera ? '' :
                   <ChatFooter />
                   }
                </div>
                {
                    isSelectedGalleryFile && (
                        <MediaGallery  />
                    ) 
                }
            </div>
    )
}