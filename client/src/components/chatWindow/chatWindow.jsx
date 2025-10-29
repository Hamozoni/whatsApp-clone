import { ChatsContext } from "../../contexts/chats.context";
import { useContext, useEffect, useState} from "react"
import{ ChatMessages} from "./chatMessages";
import { ChatHeader } from "./chatHeader";
import { ChatFooter } from "./chatFooter";
import { FilesPreview } from "./filesPreview";
import { MediaGallery } from "./mediaGallery";
import { MediaCapture } from "./mediaCapture";
import { UserContext } from "../../contexts/user.context";
import { useParams } from "react-router-dom";
import { handleFetchData } from "../../lib/fetchData";


export const ChatWindow = ()=> {

    const {
        isPreview, 
        activeChat,
        isSelectedGalleryFile,
        isCamera
    } = useContext(ChatsContext);

    const {user} = useContext(UserContext);
      const {contactId} = useParams();
    
      const [messages,setMessages] = useState([]);
      const [loading,setLoading] = useState(true);
      const [error,setError] = useState(null);
    
    useEffect(()=> {
        handleFetchData(
          `message?user_id=${user?._id}&contact_id=${contactId}`,
          setMessages,
          setLoading,
          setError
        );
      },[contactId]);

    return (

            <div className="text-[#f7f8fa] flex-1">
                <div className=" h-screen flex flex-col max-h-full">
                   <ChatHeader receiver={activeChat?.contact}/>
                   {
                      isPreview ?
                      <FilesPreview />
                    
                   : isCamera ?
                    <MediaCapture />
                      : <ChatMessages 
                            messages={messages?.messages} 
                            setMessages={setMessages} 
                            error={error}
                            loading={loading}
                        />
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