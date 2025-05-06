import axios from "axios";

export const fetch_data = async (end_point) => {
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/${end_point}`);
    return data
};
