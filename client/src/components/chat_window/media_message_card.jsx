import Audio_player from "../ui/audio_player";
import { FaPlay } from "react-icons/fa6";
import { useContext } from "react";
import { Chat_window_context } from "../../contexts/chat_window.context";
import { Files_gallery } from "../ui/files_gallery";

export const Media_message_card = ({file})=> {

    const {set_is_gallery_file,set_selected_gallery_file} = useContext(Chat_window_context);

    const handle_select_file = ()=> {
        set_selected_gallery_file(file);
        set_is_gallery_file(true);
    }

    return (
        <div className=" cursor-pointer">
            {
                file?.type === 'AUDIO' ?
                   <Audio_player audio_url={file?.url} />
                : <div onClick={handle_select_file} > <Files_gallery file_data={file} /> </div > 
            }
        </div>
    );
};
