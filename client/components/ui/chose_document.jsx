"use client"
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { 
    MdOutlineAddPhotoAlternate, 
    MdOutlineVideoCall,MdOutlineLinkedCamera,
    MdOutlinePermContactCalendar 
} from "react-icons/md";
import { Camera_photo } from "./camera_photo";


// const documents = [
//     {
//         id: 1,
//         name: 'document',
//         Icon: IoDocumentTextOutline,
//         type: 'file',
//     },
//     {
//         id: 2,
//         name: 'photos',
//         Icon: MdOutlineAddPhotoAlternate,
//         type: 'flie',
//     },
//     {
//         id: 3,
//         name: 'videos',
//         Icon: MdOutlineVideoCall,
//         type: 'flie',
//     },
//     ,
//     {
//         id: 4,
//         name: 'camera',
//         Icon: MdOutlineLinkedCamera,
//         type: 'camera',
//     },
//     {
//         id: 5,
//         name: 'contact',
//         Icon: MdOutlinePermContactCalendar,
//         type: 'contact',
//     }
// ]

export const Chose_document = () => {


    const [video_src,set_video_src]= useState(null);
    // const handle_vatar = (e) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         set_avatar(reader?.result);
    //         console.log(reader)
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   };

    const handle_camera = async ()=> {
       const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
            set_video_src(stream);

    }
    
    return (
        <div className=" absolute left-2 top-0 -translate-y-[103%] bg-[#222e35] p-3 rounded-md">
            <ul className=" relative">
                {/* {
                    documents?.map(({id,name,Icon})=> (

                    ))
                } */}
                 <li 
                     onClick={handle_camera} 
                    className="flex items-center gap-3 text-[#f7f8fa] rounded-md hover:bg-[#2b3c46] min-w-[150px] capitalize p-2">
                    {/* <label className="">
                        <input type="file"
                            accept="document/pdf"
                            onChange={handle_vatar}
                            className="hidden" />
                        </label> */}
                            <MdOutlineLinkedCamera size={24}/>
                            <span>camera</span> 
                  </li>

            {
                video_src && <Camera_photo video_src={video_src} />
            }
            </ul>
        </div>
    )
}