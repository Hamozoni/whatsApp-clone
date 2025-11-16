import { createContext } from "react";
import { Loading } from "../components/modal/loading";

export const UserContext = createContext();


const  UserContextProvider =  ({children})=> {


      return (
          <UserContext.Provider 
              value={
                {
                }
              }>
              {children}
          </UserContext.Provider>
      );


};

export default UserContextProvider;



