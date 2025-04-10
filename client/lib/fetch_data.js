import axios from "axios"


export const fetch_data = async (end_point,set_loading,set_error) => {

    set_loading(true);

    try{
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${end_point}`);
        
        return data
    }
    catch (error){
        set_error(error?.message);
        console.log(error?.message);
    }
    finally {
        set_loading(false)
    }
};
