import { useContext } from "react";
import { Avatar } from "../ui/avatar";
import { User_context } from "../../contexts/user.context";

export const Contact_card = ({_id,email,profile_picture,name,set_is_contact})=> {

    const {user,chats,set_active_chat} = useContext(User_context);

    const handle_open_chat = () => {

        const exist_chat = chats?.find(e=> e?.members.some(e=> e?._id === _id));
        
        if(!exist_chat) {
            const new_ative_chat = {
                _id: null,
                is_group: false,
                members: [
                    {
                        _id: _id,
                        name,
                        email,
                        profile_picture,
                        is_online: false
                    },
                    {
                        _id: user?._id,
                        name: user?.name,
                        email:  user?.email,
                        profile_picture: user?.photoURL,
                        is_online: false
                    },
    
                ]
    
            };
            set_active_chat(new_ative_chat);

        }else {
            set_active_chat(exist_chat);
        }
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