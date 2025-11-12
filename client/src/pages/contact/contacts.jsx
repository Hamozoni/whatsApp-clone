import { SearchInput } from "../../components/ui/searchInput";
import { GrGroup,GrUserAdd } from "react-icons/gr";
import { ContactHeader } from "./components/contactHeader";
import { NewContact } from "./components/newContact";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/index";
import { MainCard } from "../../components/shared/mainCard";
// import { ChatsContext } from "../contexts/chats.context";
import { useNavigate } from "react-router-dom";

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

const Contacts = ({setIsContcatPage})=> {

    const {contacts} = useContext(UserContext)
    const [searchText,setSearchText] = useState('');
    const [isNewContact,setIsNewContact] = useState(false);
    const navigate = useNavigate();


    return (
        <div className="rounded-lg overflow-hidden flex-1 overflow-y-auto">
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
                                       onClick={()=> navigate(`/chats/${_id}`)}
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

export default Contacts;