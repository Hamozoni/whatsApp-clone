
import { createContext, useContext, useEffect, useState,useRef } from "react";
import { UserContext } from "./user.context";
 
export const ChatsContext = createContext(null);

export const ChatsContextProvider = ({children})=> {

    const {socket,setChats,user} = useContext(UserContext);

    const [activeChat,setActiveChat] = useState({contact: {}, chat:{messages:[]}});
    const [isPreview,setIsPreview] = useState(false);
    const [isRecorder,setIsRecorder] = useState(false);
    const [isCamera,setIsCamera] = useState(false);
    const [isNewMessage,setIsNewMessage] = useState(null);
    const [message,setMessage] = useState({});
    const [text,setText] = useState('');
    const [unreadMessage,setUnreadMessage] = useState([]);
    const [selectedGalleryFile,setSelectedGalleryFile] = useState(null);
    const [isSelectedGalleryFile,setIsSelectedGalleryFile] = useState(false);

    const newSessageSoundRef = useRef(null)

    useEffect(() => {
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

            setActiveChat(prev=> {
                    if (data._id === prev.chat._id){
                        prev.chat.messages.push(data?.last_message);
                        setIsNewMessage('openChat')
                    }else {
                        setIsNewMessage('closeChat')
                    };
                return {...prev}
                }
            );
        });

        console.log(isNewMessage)
        
        return ()=> {
            socket?.off('message_sent');
            setIsNewMessage(null)
        }
    },[socket]);

    useEffect(()=> {
        newSessageSoundRef.current = setTimeout(()=> {
            setIsNewMessage(null);
        },1800);

        return ()=> {
            clearTimeout(newSessageSoundRef.current)
        }
    },[isNewMessage])
    


    return (
        <ChatsContext.Provider
            value={
                {
                    isPreview,
                    setIsPreview,
                    message,
                    setMessage,
                    activeChat,
                    setActiveChat,
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
            {
               isNewMessage === 'openChat' ?
                <audio  src="/new_message_sound_2.mp3" autoPlay className=" hidden" />
                :  isNewMessage === 'closeChat' ?
                <audio  src="/new_message_sound.mp3" autoPlay className=" hidden" />:''
            }
            {children}
        </ChatsContext.Provider>
    )
}