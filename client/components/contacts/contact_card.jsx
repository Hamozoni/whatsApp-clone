import { useContext } from "react";
import { Avatar } from "../ui/avatar";
import { User_context } from "../../contexts/user.context";
import { Chat_window_context } from "@/contexts/chat_window.context";

export const Contact_card = ({_id,email,profile_picture,name,set_is_contact})=> {

    const {user,chats} = useContext(User_context);
    const {set_active_chat} = useContext(Chat_window_context);

    const handle_open_chat = () => {

        const exist_chat = chats?.find(e=> e?.contact?._id === _id);
         set_active_chat({ 
            _id: exist_chat ? exist_chat?._id : null,
            user:{
                    _id: user?._id,
                    name: user?.name,
                    email:  user?.email,
                    profile_picture: user?.photoURL,
                },

            contact: {_id,email,profile_picture,name}
        });
            set_is_contact(false);

    }


    return (
        <div 
            onClick={handle_open_chat}
            className="cursor-pointer flex items-center gap-3 w-full px-3 hover:bg-[#222e35] hide_model"
            >
            <Avatar size='lg' user_photo={profile_picture} />
            <div className="flex flex-col border-b flex-1 border-b-[#222e35] py-3 hide_model">
                <h5>{name}</h5>
                <span className="text-xs font-light text-gray-400 hide_model">
                    {email}
                </span>
            </div>
        </div>
    )
}