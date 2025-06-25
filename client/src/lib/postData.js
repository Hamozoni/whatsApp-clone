import axios from "axios";

export const postData = async (endPoint,formData) => {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/${endPoint}`,formData);
      return data;
};