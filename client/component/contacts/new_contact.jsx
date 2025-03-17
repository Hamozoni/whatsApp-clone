"use client"
import { useContext, useState } from "react"
import { Contact_header } from "./contact_header"
import { Input } from "../inputs/input"
import { Phone_input } from "../inputs/phone_input";
import { Submit_btn } from "../inputs/submit_btn";
import axios from "axios";
import { User_context } from "../context";

export const New_contact = ({set_is_new_contact})=> {

    const {user} = useContext(User_context);

    const [search_value,set_search_value] = useState('');
    const [name,set_name] = useState('');
    const [email,set_email] = useState('');

    const handle_contact = async (e) => {

        e.preventDefault();
        try {
            const body = {
                user_email  : user?.email,
                contact_name: name,
                contact_email: email,
            };
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/craete_contact`,body);

            console.log(data);



        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="">
            <Contact_header 
                title='new contact' 
                set_backword={set_is_new_contact} 
                />
            <form onSubmit={handle_contact} className="p-3">
                <Input label='Contact Name' type='text' value={name} set_value={set_name} placeholder='john deo'/>
                <Input label='Contact Email' type='email' value={email} set_value={set_email} placeholder='exable@gmail.com'/>
                <Submit_btn text='save contact' is_loading={false} />
            </form>

        </div>
    )
}