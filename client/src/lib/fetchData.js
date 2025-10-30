import axios from "axios";

export const fetchData = async (endPoint) => {

    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/${endPoint}`);
    return data
};

 export  const handleFetchData = async (endPoint,setData,setLoading,setError) => {
      try {
        setError(null);
        setLoading(true);
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/${endPoint}`);
        setData(data);
      }
      catch (err) {
        setError(err.message);
        console.log(err)
      }
      finally {
        setLoading(false);
      };
};
