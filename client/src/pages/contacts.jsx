import { SearchInput } from "../components/ui/searchInput";
import { GrGroup,GrUserAdd } from "react-icons/gr";
import { ContactHeader } from "../components/contacts/contactHeader";
import { NewContact } from "../components/contacts/newContact";
import { ContactCard } from "../components/contacts/contactCard";
import { useContext, useState } from "react";
import { User_context } from "../contexts/user.context";

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

    const {contacts} = useContext(User_context)
    const [searchText,setSearchText] = useState('');
    const [isNewContact,setIsNewContact] = useState(false);

    return (
        <div className="">
            {
                isNewContact ? 
                <NewContact setIsNewContact={setIsNewContact}/>
                :
                <div>
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
                    <div className="p-3">
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
                                contacts?.map((contact)=> (
                                    <ContactCard 
                                        key={contact?._id}
                                        contact={contact}
                                        />
                                        
                                ))
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}