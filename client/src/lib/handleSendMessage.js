import axios from "axios";
  
export const handleSendMessage = async (
    {   
        message,
        setChats,
        setActiveChat,
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

    console.log(data)
    
    socket.emit('message_sent',data?.contact_chat);

    setChats(prev=> {
        const chats =  prev.filter(e=> e?._id !== data?.sender_chat?._id);
        return [data?.sender_chat,...chats]
    });

    setActiveChat(prev=> {

        
        if(!prev?.chat?._id){
            prev.chat = data?.sender_chat
            prev.chat.messages = [data.sender_chat.last_message]
        }else {
            prev.chat.messages.push(data?.sender_chat?.last_message)
        }

       return {...prev}
    }
  )
};
