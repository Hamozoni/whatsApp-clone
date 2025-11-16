import {useQuery} from '@tanstack/react-query';
import {getAllChats,getChatMessages} from '../../services/apiServices';

export const queryKeys = {
    chats: ['chats'],
    chat: chatId => ['chat',chatId],
    messages: chatId => ['messages',chatId],
};

export const useChats  = ()=> {
    return useQuery({
        queryKey: queryKeys.chats,
        queryFn: getAllChats
    })
};


export const useChatDetails = chatId => {
    return useQuery({
        queryKey: queryKeys.chat(chatId)
    })
};

export const useChatMessages = chatId => {
    return useQuery({
        queryKey: queryKeys.messages(chatId),
        queryFn: ()=> getChatMessages(chatId ),
        enabled: !!chatId
    })
};

