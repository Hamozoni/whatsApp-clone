
const update_status = async (socket,chat_id,sender,status,set_error)=> {
    
    try {
      const body = {
        chat_id,
        sender,
        status
      };

      const {data} =  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/message`,body);
      if(!data?.status) return;

      set_messages(data?.messages)

      const socket_data = {
        messages: data?.messages,
        chat_id
      }
      socket.emit('messag_read',socket_data);

    }
    catch (error) {
    //   set_error(error?.message);
    }

  };

  export default update_status;