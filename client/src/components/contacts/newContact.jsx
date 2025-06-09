import { useContext, useState } from "react"
import { ContactHeader } from "./contactHeader"
import { Input } from "../ui/input"
import { Submit_btn } from "../ui/submit_btn";
import { User_context } from "../../contexts/user.context";
import { ContactCard } from "./contactCard";
import { fetch_data } from "../../lib/fetch_data";
import { post_data } from "../../lib/post_data";

export const NewContact = ({setIsNewContact})=> {

    const {user,contacts,set_contacts} = useContext(User_context);

    const [email,setEmail] = useState('');
    const [is_loading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [contact,setContact] = useState(null);

    const handleContact = async (e) => {
        e.preventDefault();
        setContact(null);
        setIsLoading(true);
        setError(null);
        if(email === user?.email) {
            setError('you can not add your email');
            setIsLoading(false);
            return;
        }
        try {

            const data = await fetch_data(`contact?user_email=${user?.email}&contact_email=${email}`);
            if(!data?.status) {
                setError(data?.message)
            }else {
                setError(null);
                setContact(data?.contact);
            }
            console.log(data);
           


        }
        catch (error) {
            console.log(error);
            setError(error?.message);
        }
        finally {
            setIsLoading(false);
        }

    };

    const handleAddingContact = async(e)=> {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const body = {
            user_id: user?._id,
            contact_id : contact?._id
        }

        try {
            const {data} = await post_data(`contact`,body);
            if(data?.status) {
                set_contacts(data?.user?.contacts)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="hide_model">
            <ContactHeader 
                title='new contact' 
                setIsContcatPage={setIsNewContact} 
                />
            <form 
                onSubmit={handleContact} 
                className="p-3 hide_model"
                >
                <Input 
                    label='Contact Email' 
                    type='email' value={email} 
                    set_value={setEmail} 
                    placeholder='exable@gmail.com'
                    />
                {(!contact && error) && (
                    <p className="text-red-500 text-sm text-center mb-3">
                        {error}
                    </p>
                )}
                {
                    contact?.email !== email &&
                   <Submit_btn 
                        text='find contact' 
                        is_loading={is_loading} 
                      />
                }
            </form>

                {
                    contact && (
                    <div className="bt-3">
                        <h6 className="p-3">
                            search result : 
                        </h6>
                        <ContactCard contact={contact} />
                           {(contact && error) && (
                                <p className="text-red-500 text-sm text-center mb-3">{error}</p>
                            )}
                            { 
                            !contacts?.find(e=> e.email === contact?.email) &&
                            <form onSubmit={handleAddingContact} className="p-3">
                                <Submit_btn text='Add To Your Contact ' is_loading={is_loading} />
                            </form>

                            }
                     </div>
                    )
                }

        </div>
    )
}