import { firebaseAuth } from "../lib/firebaseConfig";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Loading } from "../components/modal/loading";
import { io } from "socket.io-client";
import { handleFetchData } from "../lib/fetchData";
import { useNavigate } from "react-router";

export const UserContext = createContext();


const  UserContextProvider =  ({children})=> {

    const navigate = useNavigate()
  
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [contacts,setContacts] = useState([]);
    const [chats,setChats] = useState([]);
    const [status,setStatus] =  useState([]);
    const [calls,setCalls] = useState([]);
    const [channels,setChannels] = useState([]);
    const [socket,setSocket] = useState(null);


    useEffect(() => {
        const initializeAuth = async () => {

          try{
            await setPersistence(firebaseAuth, browserLocalPersistence);
  
            firebaseAuth.onAuthStateChanged(async user => {

               if(user) {
                const setUserData = (data)=>{
                   setUser(data?.user);
                   setCalls(data?.user?.calls);
                   setChats(data?.chats);
                   setContacts(data?.user?.contacts);
                   setChannels(data?.channels);
                }
                 handleFetchData(`user?user_email=${user?.email}`,setUserData,setLoading,setError)
                //  const {statuses} = await fetchData(`status?user_id=${data?.user?._id}`);
                //  const st = Object.values(Object.groupBy(statuses,status=> status.user._id));
                //   setStatus(st)
    
                //  const socket = await io.connect(import.meta.env.VITE_SOCKET_URL,{
                //     reconnection: true,
                //     reconnectionAttempts: 5,
                //     transports: ['websocket'],
                //     query : {
                //         user_id: data?.user?._id
                //     }
                // });
    
                // setSocket(socket);

               }
               else {
                 navigate('/auth/signin')
               }
  
            });

          }
          catch (error){
            console.log(error.message)
            setError(error.message);
          }
          finally {
            setLoading(false)
          }

        };
    
        initializeAuth();
        return ()=> socket?.disconnect()
      }, [firebaseAuth]);

    
    if(loading) {
      return (
        <Loading />
      )
    } else {
      return (
          <UserContext.Provider 
              value={
                {
                  user,
                  setUser,
                  socket,
                  contacts,
                  setContacts,
                  loading,
                  chats,
                  setChats,
                  calls,
                  setCalls,
                  status,
                  setStatus,
                  channels
                }
              }>
              {children}
          </UserContext.Provider>
      );

    }

};

export default UserContextProvider;



