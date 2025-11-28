import { MainCard } from "../../../components/shared/mainCard";

const ContactList = ({ contacts }) => {
    return (
        <div>

            {
                contacts?.map(({ _id, photoURL, displayName, bio }) => (
                    <MainCard
                        key={_id}
                        avatarUrl={photoURL}
                        name={displayName}
                        onClick={() => navigate(`/chats/${_id}`)}
                    >
                        <span className="text-xs text-gray-400">
                            {bio}
                        </span>
                    </MainCard>

                ))
            }

        </div>
    )
};

export default ContactList;