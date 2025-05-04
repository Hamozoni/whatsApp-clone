import axios from "axios";

export const fetch_data = async (end_point) => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${end_point}`);
    return data
};
