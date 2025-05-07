import axios from "axios";

export const update_data = async (end_point,form_data) => {
      const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/${end_point}`,form_data);
      return data;
};

