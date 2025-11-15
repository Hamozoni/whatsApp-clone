import {api} from "../api";

export default {
    getAllChats : ()=> api.get('/chat').then(res=> res.data),
    getChatMessegaes: chatId => api.get(`/chat/${chatId}`).then(res=> res.data),
    getStatus: ()=> api.get('/status').then(res=> res.data),
}