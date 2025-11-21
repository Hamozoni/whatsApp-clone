import { createContext, useEffect, useState } from "react";
import auth from "../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {Loading} from '../components/modal/loading'


export const UserContext = createContext();


const  UserContextProvider =  ({children})=> {

     const [isLoading,setIsLoading] = useState(true);
     const [user,setUser] = useState(null);


     useEffect(()=>{
         setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth,async user => {
            setUser(user)
            setIsLoading(false);
        })


        return unsubscribe;
     },[]);



     

      return (
          <UserContext.Provider 
              value={{user}}>
              {isLoading ? <Loading /> : children}
          </UserContext.Provider>
      );

};

export default UserContextProvider;



