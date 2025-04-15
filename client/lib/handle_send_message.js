import axios from "axios";


  
  export const handle_send_message = async ({message,set_loading,set_error,set_chats,active_chat,set_active_chat,socket})=> {

    const formData = new FormData();

    console.log(message?.file);
     formData.append('file',message?.file);
    


    set_loading(true);

    try{
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message`,formData,{
        
                headers: {
                  'Content-Type': 'multipart/form-data'
                  // You can add other headers if needed, e.g., Authorization
                  // 'Authorization': 'Bearer your_token'
                }
        });
        console.log(data);
        
        socket?.emit('message_sent',data?.contact_chat);

        set_chats(prev=> {
         const chats =   prev.filter(e=> e?._id !== data?.sender_chat?._id);
            return [data?.sender_chat,...chats]
        });
    
        if(active_chat?._id === data?.sender_chat?._id) {
            set_messages(prev=> [...prev, data?.sender_chat?.last_message])
        }else {
            set_active_chat(data?.sender_chat);
        };
    }
    catch (error){
        set_error(error?.message);
        console.log(error?.message);
    }
    finally {
        set_loading(false)
    }

};
