import {api} from "../api";

export default {
    getAllChats : () => api.get('/chat').then(res=> res.data),
    getAllChatDetals : (chatId,params = {}) => api.get(`/chat${chatId}`,{params}).then(res=> res.data),

    getAllStatus: () => api.get('/status').then(res=> res.data),
    getStatusDetails: (statusId,params)=> api.get(`/status${statusId}`,{params}).then(res=> res.data),

    getAllChannels: () => api.get('/channel').then(res=> res.data),
    getChannelDetails: (channelId,params) => api.get(`/channel/${channelId}`,{params}).then(res=> res.data),

    getAllCalls : () => api.get('/call').then(res=> res.data),
};