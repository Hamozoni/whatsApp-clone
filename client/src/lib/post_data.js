import axios from "axios"


export const post_data = async (end_point,form_data) => {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${end_point}`,form_data);
      return data;
};