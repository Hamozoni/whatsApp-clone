import { useQuery } from "@tanstack/react-query";
import {getAllChannels} from "../../services/apiServices"


const queryKeys = {
    channels: ['channels'],
    channelDetails: channelId => ['channelDetails', channelId]
};


export const useChannels = ()=> {
    return useQuery({
        queryKey: queryKeys.channels,
        queryFn: getAllChannels
    });
};

