import { post_data } from "./post_data";

  
  export const handle_send = async (message,set_loading,set_error,set_chats,active_chat,set_active_chat,socket)=> {

    const form_data = new FormData();

    form_data.append('chat_id',message?.chat_id);
    form_data.append('sender',message?.sender);
    form_data.append('contact',message?.contact);
    form_data.append('text',message?.text);
    form_data.append('type',message?.type);
    form_data.append('status',message?.status);

    if(message?.type === 'MEDIA' && message.media.length > 0) {
        message.media.map((file)=> {
            form_data.append('files',file);
        })
    };

    const data = await post_data('message',form_data,set_loading,set_error);

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
};
