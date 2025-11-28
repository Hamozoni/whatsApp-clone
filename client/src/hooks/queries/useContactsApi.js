import { useQuery } from "@tanstack/react-query";
import { getAllContacts, getContact } from "../../services/apiServices";


const queryKeys = {
    users: ['users'],
    user: email => ['user', email]
};

export const useGetAllContacts = () => {
    return useQuery({
        queryKey: queryKeys.users,
        queryFn: getAllContacts,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
};

export const useGetContact = email => {
    return useQuery({
        queryKey: queryKeys.user(email),
        queryFn: () => getContact(email),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
};
