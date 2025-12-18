import axios from "axios";
  
export const handleSendMessage = async ({   
        message,
        setChats,
        setActiveChat,
        activeChat,
        socket
    }
    )=> {
    const formData = new FormData();

    for(let key in message) {
        formData.append(key,message[key]);
    };

    // setChats(prev=> {

    //     const newChat = prev.find(e=> e?._id === message?.chat_id);

    //     if(newChat) {
    //         newChat.last_message = message;
    //         const chats =  prev.filter(e=> e?._id !==  message?.chat_id);
    //         return [newChat,...chats]
    //     }
    //     else {
    //         const newCommingChat = {...activeChat?.chat,last_message: message}
    //         return [newCommingChat,...prev]
    //     }
    // });

    // setActiveChat(prev=> {
    //     if(!prev?.chat?._id){
    //         prev.chat.messages = [...message]
    //     }
    //     else{
    //         prev.chat.messages.push(message)
    //     }

    //    return {...prev}
    // })

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
        }
        if(data?.sender_chat._id === prev.chat._id ){
            prev.chat.messages.push(data?.sender_chat?.last_message)
        }

       return {...prev}
    }
  )
};
