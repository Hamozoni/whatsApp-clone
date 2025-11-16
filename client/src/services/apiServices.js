import {api} from "../api";

export default {
    getAllChats : () => api.get('/chat').then(res=> res.data),
    getAllChatDetals : chatId => api.get(`/chat${chatId}`).then(res=> res.data),
    getChatMessages: chatId => api.get(`/chat/${chatId}/messages`).then(res=> res.data),
    getAllStatus: () => api.get('/status').then(res=> res.data),
    getStatusDetails: statusId => api.get(`/status${statusId}`).then(res=> res.data),
    getChannels: () => api.get('/channel').then(res=> res.data),
    getChannelDetails: channelId => api.get(`/channel/${channelId}`).then(res=> res.data),
    getChannelMessages: channelId => api.get(`/channel/${channelId}/messages`).then(res=> res.data),
};