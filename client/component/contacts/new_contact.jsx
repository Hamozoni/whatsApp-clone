import { useState } from "react"
import { Contact_header } from "./contact_header"

export const New_contact = ({set_is_new_contact})=> {

    const [search_value,set_search_value] = useState('')

    return (
        <div className="">
            <Contact_header 
                title='new contact' 
                set_backword={set_is_new_contact}
                search_value={search_value}
                set_search_value={set_search_value}
                handle_search={()=> ''}
            />

        </div>
    )
}