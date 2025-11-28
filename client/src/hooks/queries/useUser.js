import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserByEmail } from "../../services/apiServices";


const queryKeys = {
    users: ['users'],
    user: user_email => ['user', user_email]
};

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: queryKeys.users,
        queryFn: getAllUsers,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
};

export const useGetUserByEmail = email => {
    return useQuery({
        queryKey: queryKeys.user(email),
        queryFn: () => getUserByEmail(email),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
};
