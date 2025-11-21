import { useContext, useState } from "react"
import { ContactHeader } from "./contactHeader"
import { Input } from "../../../components/ui/input"
import { UserContext } from "../../../contexts/user.context";
import { MainCard } from "../../../components/shared/mainCard";
import {SubmitBtn} from "../../../components/ui/submitBtn"

export const NewContact = ({setIsNewContact})=> {

    const {user} = useContext(UserContext);

    const [email,setEmail] = useState('');
    // const [isLoading,setIsLoading] = useState(false);
    // const [error,setError] = useState(null);
    const [contact,setContact] = useState(null);

    return (
        <div className="hide_model">
            <ContactHeader 
                title='new contact' 
                setIsContcatPage={setIsNewContact} 
                />
            <form 
                onSubmit={()=>''} 
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
                            avatarUrl={contact?.photoURL}
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