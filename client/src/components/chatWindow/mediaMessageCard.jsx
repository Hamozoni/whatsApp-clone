import Audio_player from "../ui/audio_player";
import { useContext } from "react";
import {ChatsContext } from "../../contexts/chats.context";
import { MediaGalleryFile } from "./mediaGalleryFile";
import { Avatar } from "../ui/avatar";

export const MediaMessageCard = ({file,sender})=> {

    const {setSetSelectedGalleryFile,setSelectedGalleryFile} = useContext(ChatsContext);

    const handleSelectFile = ()=> {
        setSelectedGalleryFile(file);
        setSetSelectedGalleryFile(true);
    }

    return (
        <div className=" cursor-pointer">
            {
                file?.type === 'AUDIO' ?
                <div className="flex items-center gap-2">
                        
                    <div className="min-w-fit">
                        <Avatar 
                            size="sm" 
                            user_photo={sender?.profile_picture} 
                        />
                    </div>
                    <Audio_player audio_url={file?.url} />
                </div>
                : <div onClick={handleSelectFile} > 
                        <MediaGalleryFile fileData={file} /> 
                   </div > 
            }
        </div>
    );
};
