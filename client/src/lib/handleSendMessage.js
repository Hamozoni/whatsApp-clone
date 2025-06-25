import axios from "axios";
  
export const handleSendMessage = async (
    {   
        message,
        setChats,
        activeChat,
        setActiveChat,
        setMessages,
        socket
    }
    )=> {
    const formData = new FormData();

    for(let key in message) {
        formData.append(key,message[key]);
    };

    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/message`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
    });
    
    socket?.emit('message_sent',data?.contact_chat);

    setChats(prev=> {
        const chats =  prev.filter(e=> e?._id !== data?.sender_chat?._id);
        return [data?.sender_chat,...chats]
    });

    if(activeChat?._id === data?.sender_chat?._id) {
        setMessages(prev=> [...prev, data?.sender_chat?.last_message])
    }else {
        setActiveChat(data?.sender_chat);
    };

};
