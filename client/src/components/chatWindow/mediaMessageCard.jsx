import { useContext } from "react";
import {ChatsContext } from "../../contexts/chats.context";
import { MediaGalleryFile } from "./mediaGalleryFile";
import { Avatar } from "../ui/avatar";
import AudioPlayer from "../ui/audioPlayer";

export const MediaMessageCard = ({file,sender})=> {

    const {setIsSelectedGalleryFile,setSelectedGalleryFile} = useContext(ChatsContext);

    const handleSelectFile = ()=> {
        setSelectedGalleryFile(file);
        setIsSelectedGalleryFile(true);
    }

    return (
        <div className=" cursor-pointer">
            {
                file?.type === 'AUDIO' ?
                <div className="flex items-center gap-1">
                    <div className="min-w-fit">
                        <Avatar 
                            size="sm" 
                            userPhoto={sender?.profile_picture} 
                        />
                    </div>
                    <AudioPlayer audioUrl={file?.url} />
                </div>
                : <div onClick={handleSelectFile} >
                       <MediaGalleryFile fileData={file} /> 
                   </div > 
            }
        </div>
    );
};
