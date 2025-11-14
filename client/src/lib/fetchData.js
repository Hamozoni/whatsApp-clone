import axios from "axios";
import {getAuth} from "firebase/auth"

 export  const handleFetchData = async (endPoint,setData,setLoading,setError) => {

    const auth = getAuth();
    const user = auth.currentUser;

    try {

      const token = await user.getIdToken();

      console.log(token)

      setError(null);
      setLoading(true);

      const config = {
        headers :{'Authorization': `Bearer ${token}`}
      }
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/${endPoint}`,config);
      setData(data);
      console.log(data);
    }
    catch (err) {
      setError(err.message);
      console.log(err)
    }
    finally {
      setLoading(false);
    };
};
