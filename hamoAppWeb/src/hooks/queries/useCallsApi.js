import { useQuery } from "@tanstack/react-query";
import { getAllCalls } from "../../services/apiServices";


const queryKeys = {
    calls: ['calls'],
};

export const useGetAllCalls = () => {
    return useQuery({
        queryKey: queryKeys.calls,
        queryFn: getAllCalls,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
};