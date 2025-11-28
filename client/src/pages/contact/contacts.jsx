import { SearchInput } from "../../components/ui/searchInput";
import { GrGroup, GrUserAdd } from "react-icons/gr";
import { ContactHeader } from "./components/contactHeader";
import { NewContact } from "./components/newContact";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactList from "./components/contactList";
import { useGetAllUsers } from "../../hooks/queries/useUser";
import { Loading } from "../../components/modal/loading";

const Button = ({ Icon, text, handle_cleck }) => {
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

const Contacts = ({ setIsContcatPage }) => {

    const { data: contacts, isLoading, error } = useGetAllUsers();

    const [searchText, setSearchText] = useState('');
    const [isNewContact, setIsNewContact] = useState(false);
    const navigate = useNavigate();


    if (isLoading) {
        return <Loading />
    };

    return (
        <div className="rounded-lg overflow-hidden flex-1 overflow-y-auto">
            {
                isNewContact ?
                    <NewContact setIsNewContact={setIsNewContact} contacts={contacts} />
                    :
                    <div className=" flex flex-col max-h-dvh">
                        <ContactHeader
                            title='new chat'
                            setIsContcatPage={setIsContcatPage}
                            search_value={searchText}
                            set_search_value={setSearchText}
                            handle_search={() => ''}
                        >
                            <SearchInput
                                value={searchText}
                                set_value={setSearchText}
                                handle_search={() => ''}
                            />
                        </ContactHeader>
                        <div className="p-3 flex-1 overflow-y-auto max-h-full">
                            <Button
                                Icon={GrGroup}
                                text='new group'
                                handle_cleck={() => ''}
                            />
                            <Button
                                Icon={GrUserAdd}
                                text='new contact'
                                handle_cleck={() =>
                                    setIsNewContact(true)}
                            />

                            <h6 className="py-3 text-xs text-emerald-300">
                                contacts on whatsapp
                            </h6>
                            <ContactList contacts={contacts} />
                        </div>

                    </div>
            }
        </div>
    )
}

export default Contacts;