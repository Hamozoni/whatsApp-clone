import { Chat_window_context } from "../../contexts/chat_window.context";
import { useContext} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Files_gallery } from "../ui/files_gallery";

export const Files_preview  = () => {

    const {message,set_is_preview,set_message} = useContext(Chat_window_context);

    const cansel_file = ()=> {
        set_message( prev => {
            return {
              chat_id: prev?.chat_id,
              sender: prev?.sender,
              contact: prev?.contact,
              text:'',
              type:'TEXT',
              status: 'SENT',
            }
          } );
        set_is_preview(false);
    }

    return (
        <div className="bg-[#111b21] flex flex-col items-center justify-center h-full">
            <header>
                <button onClick={cansel_file}>
                    <AiOutlineClose />
                </button>
            </header>
            <Files_gallery 
                file_data={message?.file} 
                is_blob={true}
                />

        </div>
    );
};