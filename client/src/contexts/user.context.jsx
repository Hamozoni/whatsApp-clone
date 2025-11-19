import { createContext } from "react";
import {getAuth} from 'firebase/auth'

export const UserContext = createContext();


const  UserContextProvider =  ({children})=> {

  const user = getAuth().currentUser;



      return (
          <UserContext.Provider 
              value={{user}}>
              {children}
          </UserContext.Provider>
      );


};

export default UserContextProvider;



