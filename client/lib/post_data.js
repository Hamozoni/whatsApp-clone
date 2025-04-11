import axios from "axios"


export const post_data = async (end_point,body,set_loading,set_error) => {

    set_loading(true);

    try{
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${end_point}`,body);
        
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