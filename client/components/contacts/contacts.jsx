"use client";

import { Search_form } from "../ui/search_form";
import { GrGroup,GrUserAdd } from "react-icons/gr";
import { Contact_header } from "./contact_header";
import { New_contact } from "./new_contact";
import { Contact_card } from "./contact_card";
import { useContext, useState } from "react";
import { User_context } from "../../contexts/user.context";

const Button = ({Icon,text,handle_cleck})=> {
    return (
        <button onClick={handle_cleck} className="cursor-pointer flex items-center gap-3 w-full px-3 hover:bg-[#222e35]">
             <div className="p-3 my-2 bg-emerald-600 flex items-center justify-center rounded-full">
                <Icon size={26} />
             </div>
             <div className="flex items-center border-b flex-1 border-b-[#222e35] py-3">
                <h5>{text}</h5>
             </div>
        </button>
    )
};

export const Contacts = ({set_is_contact})=> {

    const {contacts} = useContext(User_context)


    const [search_value,set_search_value] = useState('');
    const [is_new_contact,set_is_new_contact] = useState(false);


    return (
        <div className="h-screen max-h-screen overflow-y-auto hide_model">
            {
                is_new_contact ? 
                 <New_contact set_is_new_contact={set_is_new_contact}/>
                 :
                <div className="hide_model">
                    <Contact_header 
                        title='new chat' 
                        set_backword={set_is_contact}
                        search_value={search_value}
                        set_search_value={set_search_value}
                        handle_search={()=> ''}
                        >
                            <Search_form  
                                value={search_value} 
                                set_value={set_search_value} 
                                handle_search={()=> ''}
                            />
                    </Contact_header>
                    <div className="hide_model">
                        <Button Icon={GrGroup} text='new group' handle_cleck={()=> ''} />
                        <Button Icon={GrUserAdd} text='new contact' handle_cleck={()=> set_is_new_contact(true)} /> 

                            <h6 className="px-5 py-3 text-xs text-emerald-300 hide_model">
                            contacts on whatsapp
                        </h6>
                        <div className="hide_model">
                            {
                                contacts?.map(({_id,name,email,profile_picture})=> (
                                    <Contact_card 
                                        key={_id}
                                        _id={_id}
                                        email={email} 
                                        profile_picture={profile_picture} 
                                        name={name}
                                        set_is_contact={set_is_contact}
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