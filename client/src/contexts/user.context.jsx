import { createContext } from "react";
import auth from "../lib/firebaseConfig";

export const UserContext = createContext();


const  UserContextProvider =  ({children})=> {

  const user = auth.currentUser;



      return (
          <UserContext.Provider 
              value={{user}}>
              {children}
          </UserContext.Provider>
      );


};

export default UserContextProvider;



