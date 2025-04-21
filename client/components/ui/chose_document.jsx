"use client"
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext, useState } from "react";
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

export const Chose_document = ({set_is_document}) => {

    // const [file,set_file] = useState(null);
    const {set_message,set_is_preview} = useContext(Chat_window_context);

    const handle_select_file = (e)=> {
        set_is_preview(true);
       set_message(prev=> ({...prev,file:e.target.files[0],type:'MEDIA'}));
       set_is_document(false)
    }

    
    return (
        <div className=" absolute left-2 top-0 -translate-y-[103%] bg-[#222e35] p-3 rounded-md z-20">
            <ul className="">
                {
                    optionas?.map(({id,title, Icon,type,accept})=> (
                        <li key={id} >
                            {
                             (title === 'camera' || title === 'contact') ? 
                             <div className={className}>
                                < Icon size={24}/>
                                <span>{title}</span> 
                             </div>
                            : 
                                <label className={className}>
                                    < Icon size={24}/>
                                    <span>{title}</span> 
                                    <input onChange={handle_select_file} type={type} accept={accept} hidden/>
                                </label>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}