"use cleint"
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext} from "react"
import{ Active_chat} from "./active_chat";
import { Chat_header } from "./chat_header";
import { Chat_footer } from "./chat_footer";
import { Files_preview } from "./files_preview";
import { Media_gallery } from "./media_gallery";
import { Media_capture } from "./media_capture";


export const Chat_window = ()=> {

    const {is_preview , active_chat,is_gallery_file,is_camera} = useContext(Chat_window_context);

    return (

            <div className="text-[#f7f8fa] flex-1 h-screen max-h-screen">
                <div className=" h-screen flex flex-col max-h-full">
                   <Chat_header receiver={active_chat?.contact}/>
                   {
                      is_preview ?
                      <Files_preview />
                    
                   : is_camera ?
                    <Media_capture />
                      : <Active_chat />
                   }
                   {
                    is_camera ? '' :
                   <Chat_footer />
                   }
                </div>
                {
                    is_gallery_file && (
                        <Media_gallery  />
                    ) 
                }
            </div>
    )
}