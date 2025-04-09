"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export const Use_fetch = ({end_point})=> {

    const [data,set_data] = useState(null);
    const [loading,set_loading] = useState(true);
    const [error,set_error] = useState(null);
    
    console.log(end_point);
    useEffect(()=> {

        const fetch_data = async ()=> {

            try {
                set_loading(true);
                set_error(null);


                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${end_point}`);
                set_data(data);
                console.log(data);

            }
            catch (error) {
                set_error(error?.message);
            }
            finally {
                set_loading(false)
            }
        };

        fetch_data();
    },[]);


    return ({data,set_data,loading,error})
};