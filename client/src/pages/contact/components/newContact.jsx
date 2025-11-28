import { useState } from "react"
import { ContactHeader } from "./contactHeader"
import { Input } from "../../../components/ui/input"
import { MainCard } from "../../../components/shared/mainCard";
import { SubmitBtn } from "../../../components/ui/submitBtn"
import { useGetAllUsers, useGetUserByEmail } from "../../../hooks/queries/useUser";

export const NewContact = ({ setIsNewContact, contacts }) => {


    const [email, setEmail] = useState('');
    const [contact, setContact] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const { data: contact, error, isLoading } = useGetUserByEmail(email);

    return (
        <div className="hide_model">
            <ContactHeader
                title='new contact'
                setIsContcatPage={setIsNewContact}
            />
            <form
                onSubmit={() => ''}
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
                            !contacts?.find(e => e.email === contact?.email) &&
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