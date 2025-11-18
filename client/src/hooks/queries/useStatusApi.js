import { useQuery } from "@tanstack/react-query";
import {getAllStatus,getStatusDetails} from "../../services/apiServices"


const queryKeys = {
    status: ['status'],
    statusDetails: statusId => ['statusDetails',statusId]
};


export const useStatus =() => {
    return useQuery({
        queryKey: queryKeys.status,
        queryFn: getAllStatus,
        staleTime: 5 * 60 * 1000,
    });
};


export const useStatusDetails = statusId => {
    return useQuery({
        queryKey: queryKeys.statusDetails(statusId),
        queryFn: () => getStatusDetails(statusId),
        staleTime: 5 * 60 * 1000,
        enabled: !!statusId
    });
};