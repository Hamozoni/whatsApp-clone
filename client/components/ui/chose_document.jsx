"use client"
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { 
    MdOutlineAddPhotoAlternate, 
    MdOutlineVideoCall,MdOutlineLinkedCamera,
    MdOutlinePermContactCalendar 
} from "react-icons/md";


const documents = [
    {
        id: 1,
        name: 'document',
        Icon: IoDocumentTextOutline,
        type: 'file',
    },
    {
        id: 2,
        name: 'photos',
        Icon: MdOutlineAddPhotoAlternate,
        type: 'flie',
    },
    {
        id: 3,
        name: 'videos',
        Icon: MdOutlineVideoCall,
        type: 'flie',
    },
    ,
    {
        id: 4,
        name: 'camera',
        Icon: MdOutlineLinkedCamera,
        type: 'camera',
    },
    {
        id: 5,
        name: 'contact',
        Icon: MdOutlinePermContactCalendar,
        type: 'contact',
    }
]

export const Chose_document = () => {


    const [avatar,set_avatar]= useState()
    const handle_vatar = (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            set_avatar(reader?.result);
            console.log(reader)
          };
          reader.readAsDataURL(file);
        }
      };
    
    return (
        <div className=" absolute left-2 top-0 -translate-y-[103%] bg-[#222e35] p-3 rounded-md">
            <ul>
                {
                    documents?.map(({id,name,Icon})=> (
                        <li  key={id} className="">
                            <label className="flex items-center gap-3 text-[#f7f8fa] rounded-md hover:bg-[#2b3c46] min-w-[150px] capitalize p-2">
                            <input type="file"
                                accept="document/pdf"
                                onChange={handle_vatar}
                                className="hidden" />
                                <Icon size={24}/>
                               <span>{name}</span> 
                            </label>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}