import { useContext } from "react";
import { Avatar } from "../ui/avatar";
import { User_context } from "../../contexts/user.context";
import { ChatsContext } from "../../contexts/chats.context";

export const ContactCard = ({contact})=> {

    const {user,chats} = useContext(User_context);
    const {setActiveChat} = useContext(ChatsContext);

    const handleOpenChat = () => {

        const isExistChat = chats?.find(e=> e?.contact?._id === contact._id);
        setActiveChat({ 
            _id: isExistChat ? isExistChat._id : null,
            user: user?._id,
            contact,
        });

    }


    return (
        <div 
            onClick={handleOpenChat}
            className="cursor-pointer flex items-center gap-3 w-full px-3 hover:bg-[#222e35] rounded-md mb-1"
            >
            <Avatar size='lg' user_photo={contact?.profile_picture} />
            <div className="flex flex-col border-b flex-1 border-b-[#222e35] py-3">
                <h6>{contact?.name}</h6>
                <span className="text-xs font-light text-gray-400">
                    {contact?.about}
                </span>
            </div>
        </div>
    )
}