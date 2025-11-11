import { useContext, useState } from "react"
import { ContactHeader } from "./contactHeader"
import { Input } from "../../../components/ui/input"
import { UserContext } from "../../../contexts/user.context";
import { postData } from "../../../lib/postData";
import { MainCard } from "../../../components/shared/mainCard";
import { fetchData } from "../../../lib/fetchData";
import {SubmitBtn} from "../../../components/ui/submitBtn"

export const NewContact = ({setIsNewContact})=> {

    const {user,contacts, setContacts} = useContext(UserContext);

    const [email,setEmail] = useState('');
    const [isLoading,setIsLoading] = useState(false);
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

            const data = await fetchData(`contact?user_email=${user?.email}&contact_email=${email}`);
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
            const {data} = await postData(`contact`,body);
            if(data?.status) {
                setContacts(data?.user?.contacts)
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
                   <SubmitBtn
                        text='find contact' 
                        isLoading={isLoading} 
                      />
                }
            </form>

                {
                    contact && (
                    <div className="bt-3">
                        <h6 className="p-3">
                            search result : 
                        </h6>
                        <MainCard 
                            avatarUrl={contact?.profile_picture}
                            name={contact?.name}
                            >
                            <span className="text-xs text-gray-400">
                                {contact?.about}
                            </span>
                        </MainCard> 
                           {(contact && error) && (
                                <p className="text-red-500 text-sm text-center mb-3">
                                    {error}
                                </p>
                            )}
                            { 
                            !contacts?.find(e=> e.email === contact?.email) &&
                            <form onSubmit={handleAddingContact} className="p-3">
                                <SubmitBtn text='Add To Your Contact ' isLoading={isLoading} />
                            </form>

                            }
                     </div>
                    )
                }

        </div>
    )
}