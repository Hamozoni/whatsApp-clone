import { useContext, useState } from "react"
import { Contact_header } from "./contact_header"
import { Input } from "../ui/input"
// import { Phone_input } from "../inputs/phone_input";
import { Submit_btn } from "../ui/submit_btn";
import axios from "axios";
import { User_context } from "../../contexts/user.context";
import { Contact_card } from "./contact_card";
import { fetch_data } from "../../lib/fetch_data";

export const New_contact = ({set_is_new_contact})=> {

    const {user,contacts,set_contacts} = useContext(User_context);

    const [email,set_email] = useState('');
    const [is_loading,set_is_loading] = useState(false);
    const [error,set_error] = useState(null);
    const [contact,set_contact] = useState(null);

    const handle_contact = async (e) => {
        e.preventDefault();
        set_contact(null);
        set_is_loading(true);
        set_error(null);
        if(email === user?.email) {
            set_error('you can not add your email');
            set_is_loading(false);
            return;
        }
        try {

            const data = await fetch_data(`contact?user_email=${user?.email}&contact_email=${email}`);
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

    };

    const handle_adding_contact = async(e)=> {
        e.preventDefault();
        set_error(null);
        set_is_loading(true);

        const body = {
            user_id: user?._id,
            contact_id : contact?._id
        }

        try {
            const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/contact`,body);

            if(data?.status) {
                set_contacts(data?.user?.contacts)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            set_is_loading(false)
        }
    }

    return (
        <div className="hide_model">
            <Contact_header 
                title='new contact' 
                set_backword={set_is_new_contact} 
                />
            <form onSubmit={handle_contact} className="p-3 hide_model">
                <Input label='Contact Email' type='email' value={email} set_value={set_email} placeholder='exable@gmail.com'/>
                {(!contact && error) && (
                        <p className="text-red-500 text-sm text-center mb-3 hide_model">{error}</p>
                )}
                {
                    contact?.email !== email &&
                   <Submit_btn text='find contact' is_loading={is_loading} />
                }
            </form>

                {
                    contact && (
                    <div className="bt-3 hide_model">
                        <h6 className="p-3 hide_model">search result : </h6>
                        <Contact_card 
                            _id={contact?._id}
                            email={contact?.email}
                            profile_picture={contact?.profile_picture}
                            name={contact?.name}
                            set_is_contact={set_is_new_contact}
                        
                             />
                           {(contact && error) && (
                                    <p className="text-red-500 text-sm text-center mb-3 hide_model">{error}</p>
                            )}
                            { 
                            !contacts?.find(e=> e.email === contact?.email) &&
                            <form onSubmit={handle_adding_contact} className="p-3 hide_model">
                                <Submit_btn text='Add To Your Contact hide_model' is_loading={is_loading} />
                            </form>

                            }
                     </div>
                    )
                }

        </div>
    )
}