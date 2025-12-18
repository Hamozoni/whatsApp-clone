import axios from "axios";

export const updateData = async (endPoint,formData) => {
      const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/${endPoint}`,formData);
      return data;
};

