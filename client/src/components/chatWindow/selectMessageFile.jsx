import {ChatsContext } from "../../contexts/chats.context";
import { useContext } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { 
    MdOutlineAddPhotoAlternate, 
    MdOutlineVideoCall,MdOutlineLinkedCamera,
    MdOutlinePermContactCalendar 
} from "react-icons/md";


const optionas = [
    {id: 1,  title: 'document', Icon: IoDocumentTextOutline, type: 'file', accept: 'application/pdf'},
    { id: 2, title: 'photo', Icon: MdOutlineAddPhotoAlternate, type: 'file', accept: 'image/*'},
    { id: 3, title: 'video', Icon: MdOutlineVideoCall, type: 'file', accept: 'video/*'},
    { id: 4, title: 'camera', Icon: MdOutlineLinkedCamera, type: 'camera', accept: 'image_video' },
    { id: 5, title: 'contact', Icon: MdOutlinePermContactCalendar, type: 'contact', accept: 'contacts' },
];

const className = "flex items-center gap-3 text-[#f7f8fa] rounded-md hover:bg-[#2b3c46] min-w-[150px] capitalize p-2"

export const SelectMessageFile = ({setIsDocument}) => {

    // const [file,set_file] = useState(null);
    const {setMessage,setIsPreview,setIsCamera} = useContext(ChatsContext);

    const handleS0electFile = (e)=> {
        setIsPreview(true);
       setMessage(prev=> ({...prev,file:e.target.files[0],type:'MEDIA'}));
       setIsDocument(false)
    }

    
    return (
        <div className=" absolute left-2 top-0 -translate-y-[103%] bg-[#222e35] p-3 rounded-md z-20">
            <ul className="">
                {
                    optionas?.map(({id,title, Icon,type,accept})=> (
                        <li key={id} >
                            {
                             (title === 'camera' || title === 'contact') ? 
                             <div onClick={()=>{
                                title === 'camera' && setIsCamera(true)
                             }} className={className}>
                                < Icon size={24}/>
                                <span>{title}</span> 
                             </div>
                            : 
                                <label className={className}>
                                    < Icon size={24}/>
                                    <span>{title}</span> 
                                    <input onChange={handleS0electFile} type={type} accept={accept} hidden/>
                                </label>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}