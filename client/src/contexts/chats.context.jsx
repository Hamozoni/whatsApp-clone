
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./user.context";
import { fetchData } from "../lib/fetchData";
 

export const ChatsContext = createContext(null);

export const ChatsContextProvider = ({children})=> {

    const {user,socket,setChats} = useContext(UserContext);

    const [activeChat,setActiveChat] = useState(null);
    const [isPreview,setIsPreview] = useState(false);
    const [isRecorder,setIsRecorder] = useState(false);
    const [isCamera,setIsCamera] = useState(false);


    const [messages, setMessages] = useState([]);
    const [message,setMessage] = useState({});
    const [text,setText] = useState('');
    const [unreadMessage,setUnreadMessage] = useState([]);
    const [selectedGalleryFile,setSelectedGalleryFile] = useState(null);
    const [isSelectedGalleryFile,setIsSelectedGalleryFile] = useState(false);
    const messageSoundRef = useRef(null);

  

    useEffect(() => {
        setMessages([]);
        setText('')
        setMessage({
          chat_id: activeChat?._id ?  activeChat?._id : null,
          sender: user?._id,
          contact: activeChat?.contact?._id,
          text:'',
          type:'TEXT',
          status: 'SENT',
        });

    },[activeChat]);


    useEffect(()=> {
        socket?.on('message_sent',data=> {
            setChats(prev=> {
                const chats = prev?.filter(e=> e?._id !== data?._id);
                return [data,...chats]
            });

            if(data?._id !== activeChat?._id) {
                messageSoundRef?.current?.play();
            }
        });
        
        return ()=> {
            socket?.off('message_sent');
        }
    },[socket]);
    


    return (
        <ChatsContext.Provider
            value={
                {
                    isPreview,
                    setIsPreview,
                    messages,
                    setMessages,
                    message,
                    setMessage,
                    activeChat,
                    setActiveChat,
                    loading,
                    error,
                    unreadMessage,
                    setUnreadMessage,
                    text,
                    setText,
                    isRecorder,
                    setIsRecorder,
                    selectedGalleryFile,
                    setSelectedGalleryFile,
                    isSelectedGalleryFile,
                    setIsSelectedGalleryFile,
                    isCamera,
                    setIsCamera,
                }
                }
        >
           <audio ref={messageSoundRef} src="./new_message_sound.mp3" className=" hidden"></audio>
            {children}
        </ChatsContext.Provider>
    )
}