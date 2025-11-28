import { api } from "../lib";

export const getUserByEmail = (email) => api.get(`/user/${email}`).then(res => res.data);
export const getAllUsers = () => api.get('/user').then(res => res.data);
export const getAllChats = () => api.get('/chat').then(res => res.data);
export const getChatDetals = (chatId, params = {}) => api.get(`/chat/${chatId}`, { params }).then(res => res.data);

export const getAllStatus = () => api.get('/status').then(res => res.data);
export const getStatusDetails = (statusId, params) => api.get(`/status/${statusId}`, { params }).then(res => res.data);

export const getAllChannels = () => api.get('/channel').then(res => res.data);
export const getChannelDetails = (channelId, params) => api.get(`/channel/${channelId}`, { params }).then(res => res.data);

export const getAllCalls = () => api.get('/call').then(res => res.data);