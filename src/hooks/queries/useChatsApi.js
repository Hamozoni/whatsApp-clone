import { useQuery } from '@tanstack/react-query';
import { getAllChats, getChatDetals } from '../../services/apiServices';

export const queryKeys = {
    chats: ['chats'],
    chat: chatId => ['chat', chatId],
};

export const useGetAllChats = () => {
    return useQuery({
        queryKey: queryKeys.chats,
        queryFn: getAllChats,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
};


export const useGetChat = chatId => {
    return useQuery({
        queryKey: queryKeys.chat(chatId),
        queryFn: () => getChatDetals(chatId),
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        enabled: !!chatId
    });
};


