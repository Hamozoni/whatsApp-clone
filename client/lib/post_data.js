import axios from "axios"


export const post_data = async (end_point,form_data,set_loading,set_error) => {

       set_loading(true);
       set_error(null);
       try {
          const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL + end_point,form_data);
            return data
       }
       catch (error) {
           set_error(error?.message)
       }
       finally {
        set_loading(false)
       }
};