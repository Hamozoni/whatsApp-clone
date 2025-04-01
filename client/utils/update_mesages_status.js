import axios from "axios";

const update_status = async ({chat_id,sender,status})=> {
    
    try {
      const body = {
        chat_id,
        sender,
        status
      };

      const {data} =  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/message`,body);

        return data;

    }
    catch (error) {
      return {message:error?.message, status: false};
    }

  };

  export default update_status;