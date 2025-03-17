import { useState } from "react"
import { Contact_header } from "./contact_header"
import { Input } from "../inputs/input"

export const New_contact = ({set_is_new_contact})=> {

    const [search_value,set_search_value] = useState('');
    const [name,set_name] = useState('');

    return (
        <div className="">
            <Contact_header 
                title='new contact' 
                set_backword={set_is_new_contact}
                search_value={search_value}
                set_search_value={set_search_value}
                handle_search={()=> ''}
            />
            <form className="p-3">
                <Input label='Full Name' type='text' value={name} set_value={set_name} placeholder='Full name'/>
            </form>

        </div>
    )
}