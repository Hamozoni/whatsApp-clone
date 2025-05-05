import axios from "axios"


export const post_data = async (end_point,form_data) => {
      const {data} = await axios.post(`${mport.meta.env.VITE_API_URL}/${end_point}`,form_data);
      return data;
};