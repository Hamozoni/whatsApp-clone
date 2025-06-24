import { firebase_auth } from "../lib/firebase_config";
import { createContext, useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { Loading_component } from "../components/ui/loading_component";
import { fetch_data } from "../lib/fetch_data";
import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";

export const UserContext = createContext();


export const  UserContextProvider =  ({children})=> {
  
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [contacts,setContacts] = useState([]);
    const [chats,setChats] = useState([]);
    const [status,setStatus] =  useState([]);
    const [calls,setCalls] = useState([]);
    const [channels,setChannels] = useState([]);
    const [socket,setSocket] = useState(null);
    const [activeNavbar,setActiveNavbar] = useState('chats');

    // const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
          setLoading(true);
          setError(null);

          try{
            await setPersistence(firebase_auth, browserLocalPersistence);
  
            firebase_auth.onAuthStateChanged(async user => {
               const data = await fetch_data(`user?user_email=${user?.email}`);
               const {statuses} = await fetch_data(`status?user_id=${data?.user?._id}`);
               const st = Object.values(Object.groupBy(statuses,status=> status.user._id));
                 setStatus(st)
                 setUser(data?.user);
                 setCalls(data?.user?.calls)
                 setChats(data?.chats);
                 setContacts(data?.user?.contacts);
                 setChannels(data?.channels);
  
               const socket = await io.connect(import.meta.env.VITE_SOCKET_URL,{
                  reconnection: true,
                  reconnectionAttempts: 5,
                  transports: ['websocket'],
                  query : {
                      user_id: data?.user?._id
                  }
              });
  
              setSocket(socket);
  
            });

          }
          catch (error){
            console.log(error.message)
            setError(error.message);
          }
          finally {
            setLoading(false);
          }

        };
    
        initializeAuth();
        return ()=> socket?.disconnect()
      }, [firebase_auth]);

    
    if(loading) {
      return (
        <Loading_component />
      )
    }
    
      return (
          <UserContext.Provider 
              value={
                {
                  user,
                  set_user: setUser,
                  socket,
                  contacts,
                  set_contacts: setContacts,
                  loading,
                  chats,
                  set_chats: setChats,
                  active_navbar: activeNavbar,
                  set_active_navbar: setActiveNavbar,
                  calls,
                  set_calls: setCalls,
                  status,
                  set_status: setStatus,
                  channels
                }
              }>
              {children}
          </UserContext.Provider>
      );

};



