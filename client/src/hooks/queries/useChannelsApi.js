import { useQuery } from "@tanstack/react-query";
import {getAllChannels,getChannelDetails} from "../../services/apiServices"


const queryKeys = {
    channels: ['channels'],
    channelDetails: channelId => ['channelDetails', channelId]
};


export const useChannels = ()=> {
    return useQuery({
        queryKey: queryKeys.channels,
        queryFn: getAllChannels,
        staleTime: 5 * 60 * 1000,
    });
};

export const useChannelDetails = channelId => {
    return useQuery({
        queryKey: queryKeys.channelDetails(channelId),
        queryFn: ()=> getChannelDetails(channelId),
        staleTime: 5 * 60 * 1000,
        enabled: !!channelId
    })
}

