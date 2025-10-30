import { ChatsContext } from "../../contexts/chats.context";
import { useContext, useEffect, useState} from "react"
import{ ChatMessages} from "./chatMessages";
import { ChatHeader } from "./chatHeader";
import { ChatFooter } from "./chatFooter";
import { FilesPreview } from "./filesPreview";
import { MediaGallery } from "./mediaGallery";
import { MediaCapture } from "./mediaCapture";
import { handleFetchData } from "../../lib/fetchData";
import { UserContext } from "../../contexts/user.context";
import { useParams } from "react-router-dom";
import { Loading } from "../modal/loading";

const className = 'flex-1 overflow-y-auto space-y-2 p-4 bg-[#162127] rounded-lg my-1';

export const ChatWindow = ()=> {

    const {
        isPreview, 
        isSelectedGalleryFile,
        isCamera,
        setActiveChat,
        activeChat

    } = useContext(ChatsContext);

 const {user} = useContext(UserContext);

  const {contactId} = useParams();
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
      
  useEffect(()=> {
      handleFetchData(
        `message?user_id=${user?._id}&contact_id=${contactId}`,
        setActiveChat,
        setLoading,
        setError
    );

    },[contactId]);


    if(error){
        return (
        <div className={className}>
            <h3>{error}</h3>
        </div>
        )
    };


    return (

            <div className="text-[#f7f8fa] flex-1">
                {
                    loading ? 
                    <div className={className}>
                        <Loading />
                    </div> :
                    <>
                        <div className=" h-screen flex flex-col max-h-full">
                        <ChatHeader contact={activeChat?.contact} />
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
                    </>
                }
            </div>
    )
}