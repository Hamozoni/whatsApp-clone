import { useQuery } from "@tanstack/react-query";
import {getAllCalls} from "../../services/apiServices";

export const useCall = ()=> {
    return useQuery({
        queryKey: ['calls'],
        queryFn: ()=>  getAllCalls(),
    });
};