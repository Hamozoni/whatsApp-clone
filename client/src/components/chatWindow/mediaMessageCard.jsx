import Audio_player from "../ui/audio_player";
import { useContext } from "react";
import {ChatsContext } from "../../contexts/chats.context";
import { MediaGalleryFile } from "./mediaGalleryFile";

export const MediaMessageCard = ({file})=> {

    const {setSetSelectedGalleryFile,setSelectedGalleryFile} = useContext(ChatsContext);

    const handleSelectFile = ()=> {
        setSelectedGalleryFile(file);
        setSetSelectedGalleryFile(true);
    }

    return (
        <div className=" cursor-pointer">
            {
                file?.type === 'AUDIO' ?
                   <Audio_player audio_url={file?.url} />
                : <div onClick={handleSelectFile} > 
                        <MediaGalleryFile fileData={file} /> 
                   </div > 
            }
        </div>
    );
};
