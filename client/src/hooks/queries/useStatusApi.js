import { useQuery } from "@tanstack/react-query";
import {getAllStatus,getStatusDetails} from "../../services/apiServices"


const queryKeys = {
    status: ['status'],
    statusDetails: statusId => ['statusDetails',statusId]
};


export const useStatus =() => {
    return useQuery({
        queryKey: queryKeys.status,
        queryFn: getAllStatus
    });
};


export const useStatusDetails = statusId => {
    return useQuery({
        queryKey: queryKeys.statusDetails(statusId),
        queryFn: () => getStatusDetails(statusId),
        enabled: !!statusId
    });
};