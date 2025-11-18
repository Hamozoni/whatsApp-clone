import {useQuery} from '@tanstack/react-query';
import {getAllChats,getChatDetails} from '../../services/apiServices';

export const queryKeys = {
    chats: ['chats'],
    chatDetails: chatId => ['chatDetails',chatId],
};

export const useChats  = ()=> {
    return useQuery({
        queryKey: queryKeys.chats,
        queryFn: getAllChats
    })
};


export const useChatDetails = chatId => {
    return useQuery({
        queryKey: queryKeys.chatDetails(chatId),
        queryFn: chatId => getChatDetails(chatId)
    });
};


