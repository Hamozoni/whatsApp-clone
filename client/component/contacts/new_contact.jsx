"use client"
import { useContext, useState } from "react"
import { Contact_header } from "./contact_header"
import { Input } from "../inputs/input"
// import { Phone_input } from "../inputs/phone_input";
import { Submit_btn } from "../inputs/submit_btn";
import axios from "axios";
import { User_context } from "../context";
import { Contact_card } from "./contact_card";

export const New_contact = ({set_is_new_contact})=> {

    const {user} = useContext(User_context);

    const [email,set_email] = useState('');
    const [is_loading,set_is_loading] = useState(false);
    const [error,set_error] = useState(null);
    const [contact,set_contact] = useState(null);

    const handle_contact = async (e) => {
        e.preventDefault();
        set_contact(null);
        set_is_loading(true);
        set_error(null);
        try {
            const body = {
                user_email  : user?.email,
                contact_email: email,
            };
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/craete_contact`,body);
            if(!data?.status) {
                set_error(data?.message)
            }else {
                set_error(null);
                set_contact(data?.contact);
            }
            console.log(data);
           


        }
        catch (error) {
            console.log(error);
            set_error(error?.message);
        }
        finally {
            set_is_loading(false);
        }

    }

    return (
        <div className="">
            <Contact_header 
                title='new contact' 
                set_backword={set_is_new_contact} 
                />
            <form onSubmit={handle_contact} className="p-3">
                <Input label='Contact Email' type='email' value={email} set_value={set_email} placeholder='exable@gmail.com'/>
                {error && (
                        <p className="text-red-500 text-sm text-center mb-3">{error}</p>
                )}
                <Submit_btn text='find contact' is_loading={is_loading} />
            </form>

                {
                    contact && (
                    <div className="bt-3">
                        <h6 className="p-3">search results : </h6>
                        <Contact_card 
                            id={contact?.id}
                            email={contact?.email}
                            profile_picture={contact?.profile_picture}
                            name={contact?.name}
                            set_is_contact={set_is_new_contact}
                        
                             />
                     </div>
                    )
                }

        </div>
    )
}