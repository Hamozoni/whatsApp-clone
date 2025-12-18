import { useQuery } from "@tanstack/react-query";
import { getAllChannels, getChannelDetails } from "../../services/apiServices"


const queryKeys = {
    channels: ['channels'],
    channelDetails: channelId => ['channelDetails', channelId]
};


export const useGetAllChannels = () => {
    return useQuery({
        queryKey: queryKeys.channels,
        queryFn: getAllChannels,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export const useGetChannel = channelId => {
    return useQuery({
        queryKey: queryKeys.channelDetails(channelId),
        queryFn: () => getChannelDetails(channelId),
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        enabled: !!channelId
    })
}

