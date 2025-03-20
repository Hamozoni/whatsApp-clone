import { useContext } from "react";
import { Avatar } from "../avatar";
import { User_context } from "../context";
import { v4 as uuid } from "uuid";

export const Contact_card = ({_id,email,profile_picture,name,set_is_contact})=> {

    const {user,set_active_chat} = useContext(User_context);

    const handle_open_chat = () => {

        const exist_chat = user?.chats?.find(e=> e === _id && e?.is_group === false);
        
        if(!exist_chat) {
            const new_ative_chat = {
                id: uuid(),
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
            className="cursor-pointer flex items-center gap-3 w-full px-3 hover:bg-[#222e35]"
            >
            <Avatar size='lg' user_photo={profile_picture} />
            <div className="flex flex-col border-b flex-1 border-b-[#222e35] py-3">
                <h5>{name}</h5>
                <span className="text-xs font-light text-gray-400">
                    {email}
                </span>
            </div>
        </div>
    )
}