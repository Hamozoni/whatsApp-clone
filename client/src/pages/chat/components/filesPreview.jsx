import { ChatsContext } from "../../../contexts/index";
import { useContext} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MediaGalleryFile } from "./mediaGalleryFile";

export const FilesPreview  = () => {

    const {message,setIsPreview,setMessage} = useContext(ChatsContext);

    const canselFile = ()=> {
        setMessage( prev => {
            return {
              chat_id: prev?.chat_id,
              sender: prev?.sender,
              contact: prev?.contact,
              text:'',
              type:'TEXT',
              status: 'SENT',
            }
          } );
        setIsPreview(false);
    }

    return (
        <div className="bg-[#111b21] flex flex-col items-center justify-center h-full">
            <header>
                <button onClick={canselFile}>
                    <AiOutlineClose />
                </button>
            </header>
            <MediaGalleryFile 
                fileData={message?.file} 
                isBlob={true}
                />

        </div>
    );
};