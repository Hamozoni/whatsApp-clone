import {useQuery} from '@tanstack/react-query';
import { getAllChats ,getChatDetals} from '../../services/apiServices';

export const queryKeys = {
    chats: ['chats'],
    chatDetails: chatId => ['chatDetails',chatId],
};

export const useChats  = ()=> {
    return useQuery({
        queryKey: queryKeys.chats,
        queryFn:  getAllChats ,
        staleTime: 5 * 60 * 1000,
    })
};


export const useChatDetails = chatId => {
    return useQuery({
        queryKey: queryKeys.chatDetails(chatId),
        queryFn: () => getChatDetals(chatId),
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
        enabled: !!chatId
    });
};


