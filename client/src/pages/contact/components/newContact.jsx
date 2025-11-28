import { useState } from "react"
import { ContactHeader } from "./contactHeader"
import { Input } from "../../../components/ui/input"
import { MainCard } from "../../../components/shared/mainCard";
import { SubmitBtn } from "../../../components/ui/submitBtn";
import { useGetContact } from "../../../hooks/queries/useContactsApi";
import { Loading } from "../../../components/modal/loading";


const Contact = ({ email, contacts }) => {
    const { data: contact, error, isLoading } = useGetContact(email);

    console.log(contact)
    if (isLoading) return <Loading />
    return (
        <div className="bt-3">
            <h6 className="p-3">
                search result :
            </h6>
            <MainCard
                avatarUrl={contact?.photoURL}
                name={contact?.displayName}
            >
                <span className="text-xs text-gray-400">
                    {contact?.bio}
                </span>
            </MainCard>
            {(contact && error) && (
                <p className="text-red-500 text-sm text-center mb-3">
                    {error}
                </p>
            )}
            {
                contacts?.find(e => e.email === contact?.email) &&
                <form onSubmit={handleAddingContact} className="p-3">
                    <SubmitBtn text='Add To Your Contact ' isLoading={isLoading} />
                </form>

            }
        </div>
    )
}

export const NewContact = ({ setIsNewContact, contacts }) => {


    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(false);

    const handleFindContact = (e) => {
        e.preventDefault();

        setEmail(e.target.value);
        setContact(true);

    }

    return (
        <div className="hide_model">
            <ContactHeader
                title='new contact'
                setIsContcatPage={setIsNewContact}
            />
            <form
                onSubmit={(e) => handleFindContact(e)}
                className="p-3 hide_model"
            >
                <Input
                    label='Contact Email'
                    type='email' value={email}
                    set_value={setEmail}
                    placeholder='exable@gmail.com'
                />

                {
                    !contact &&
                    <SubmitBtn
                        text='find contact'
                        isLoading={false}
                    />
                }
            </form>

            {
                (contact && email) && <Contact email={email} contacts={contacts} />
            }

        </div>
    )
}