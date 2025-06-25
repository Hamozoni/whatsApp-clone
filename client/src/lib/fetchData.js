import axios from "axios";

export const fetchData = async (endPoint) => {
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/${endPoint}`);
    return data
};
