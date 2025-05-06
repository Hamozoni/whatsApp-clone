import axios from "axios";
  
export const handle_send_message = async (
    {   
        message,
        set_chats,
        active_chat,
        set_active_chat,
        set_messages,
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

    set_chats(prev=> {
        const chats =  prev.filter(e=> e?._id !== data?.sender_chat?._id);
        return [data?.sender_chat,...chats]
    });

    if(active_chat?._id === data?.sender_chat?._id) {
        set_messages(prev=> [...prev, data?.sender_chat?.last_message])
    }else {
        set_active_chat(data?.sender_chat);
    };

};
