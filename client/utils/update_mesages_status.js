import axios from "axios";

const update_message_status_db = async ({chat_id,sender,status})=> {
    
    try {
      const body = {
        chat_id,
        sender,
        status
      };

      const {data} =  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/message`,body);

      if(data?.status) {
        return data;
      } else {
        return  {message:error?.message, status: false}
      }


    }
    catch (error) {
      return {message:error?.message, status: false};
    }

  };


  const update_message_status = (socket,chat_id,sender,status,receiver)=> {

      const data = {
          chat_id,
          sender,
          status
      };
      update_message_status_db(data)
      .then((data)=> {
          if(data?.status) {
                socket?.emit('join_room',chat_id);
                socket?.emit('messages_status',{status,chat_id,receiver});
          }
      })
  };

  export default update_message_status;