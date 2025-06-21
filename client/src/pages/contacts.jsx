import { SearchInput } from "../components/ui/searchInput";
import { GrGroup,GrUserAdd } from "react-icons/gr";
import { ContactHeader } from "../components/contacts/contactHeader";
import { NewContact } from "../components/contacts/newContact";
import { useContext, useState } from "react";
import { User_context } from "../contexts/user.context";
import { MainCard } from "../components/shared/mainCard";
import { ChatsContext } from "../contexts/chats.context";

const Button = ({Icon,text,handle_cleck})=> {
    return (
        <button 
            onClick={handle_cleck} 
            className="cursor-pointer flex items-center mb-1 gap-3 w-full px-3 hover:bg-[#222e35] rounded-md"
            >
             <div className="p-3 bg-emerald-600 flex items-center justify-center rounded-full">
                <Icon size={26} />
             </div>
             <div className="flex items-center border-b flex-1 border-b-[#222e35] py-5">
                <h5>{text}</h5>
             </div>
        </button>
    )
};

export const Contacts = ({setIsContcatPage})=> {

    const {contacts,chats,user} = useContext(User_context)
    const {setActiveChat} = useContext(ChatsContext);
    const [searchText,setSearchText] = useState('');
    const [isNewContact,setIsNewContact] = useState(false);

    const handleActiveChat = ({_id,profile_picture,name,about})=> {
        const isChatExist = chats.find(e=> e?.contact?._id === _id);
        if(isChatExist){
            setActiveChat(isChatExist)
        }else {
            setActiveChat({
                contact: {_id,profile_picture,name,about},
                chat_id: null,
                sender: user?._id,
                text:'',
                type:'TEXT',
                status: 'SENT',
            })
        }
    }

    return (
        <div className="rounded-lg overflow-hidden">
            {
                isNewContact ? 
                <NewContact setIsNewContact={setIsNewContact}/>
                :
                <div className=" flex flex-col max-h-dvh">
                    <ContactHeader 
                        title='new chat' 
                        setIsContcatPage={setIsContcatPage}
                        search_value={searchText}
                        set_search_value={setSearchText}
                        handle_search={()=> ''}
                        >
                        <SearchInput  
                            value={searchText} 
                            set_value={setSearchText} 
                            handle_search={()=> ''}
                        />
                    </ContactHeader>
                    <div className="p-3 flex-1 overflow-y-auto max-h-full">
                        <Button 
                            Icon={GrGroup} 
                            text='new group' 
                            handle_cleck={()=> ''} 
                            />
                        <Button 
                            Icon={GrUserAdd} 
                            text='new contact' 
                            handle_cleck={()=> 
                            setIsNewContact(true)} 
                            /> 

                        <h6 className="py-3 text-xs text-emerald-300">
                            contacts on whatsapp
                        </h6>
                        <div >
                            {
                                contacts?.map(({_id,profile_picture,name,about})=> (
                                    <MainCard 
                                       key={_id}
                                       avatarUrl={profile_picture}
                                       name={name}
                                       onClick={()=> handleActiveChat({_id,profile_picture,name,about})}
                                    >
                                        <span className="text-xs text-gray-400">
                                            {about}
                                        </span>
                                    </MainCard> 
                                        
                                ))
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}