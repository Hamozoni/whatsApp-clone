import { useContext, useState } from "react"
import { User_context } from "../../contexts/user.context";
import { GrFormAdd } from "react-icons/gr";
import { StatusMenuModel } from "./statusMenuModel";
import { Close_model } from "../ui/close_model";
import { PostTextStatus } from "./postTextStatus";
import { StatusCard } from "./statusCard";
import { Avatar } from "../ui/avatar";
import {PostImageStatus } from "./postImageStatus";
import{ VideoTrimmer }from "./postVideoStatus";


export const Status = ()=> {

    const {user,status} = useContext(User_context);
    const [isUpdate,setIsUpdate] = useState(false);
    const [statusType,setStatusType] = useState(null);
    const [file,setFile] = useState(null);

    return (
        <div className="flex h-dvh">
            <div className=" p-3 flex-1 border-r border-cyan-950">
                 {
                    statusType === 'text' ?
                    <PostTextStatus setStatusType={setStatusType} />
                    : statusType === 'image' ? 
                     <PostImageStatus setStatusType={setStatusType} file={file} />
                    : statusType === 'video' && 
                    <VideoTrimmer videoFile={file} setStatusType={setStatusType} />
                }
                <header className="relative h-fit">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold mb-3">Status</h4>
                        <button onClick={()=> setIsUpdate(!isUpdate)} className="rounded-full border border-white">
                            <GrFormAdd size={20}/>
                        </button>
                    </div>
                    <div 
                        onClick={()=> setIsUpdate(!isUpdate)} 
                        className="flex gap-2 cursor-pointer"
                        >
                        <div className="relative">
                            <Avatar size="lg" user_photo={user?.profile_picture} />
                            <button className=" absolute right-0 bottom-0 rounded-full border border-cyan-950 bg-emerald-500">
                                <GrFormAdd />
                            </button>
                        </div>
                        <div className="">
                            <h5 className="m-0">My status</h5>
                            <span className="text-xs">Click to add status update</span>
                        </div>
                    </div>
                    {
                        isUpdate && 
                        <>
                            <Close_model set_model={setIsUpdate} />
                            <StatusMenuModel setFile={setFile} setStatusType={setStatusType}/>

                        </>
                    
                    }

                </header>
                <div className="">
                     <h6 className="my-4">
                        Recent
                     </h6>
                    <div className="">
                        {
                            status?.map((st)=> (
                                <StatusCard
                                    length={st.length} 
                                    key={st[0]?._id} 
                                    status={st} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-2"></div>
        </div>
    )
};



// import { useState } from "react";
// import { PostStatusFooter } from "./postStatusFooter";
// import { IoChevronBackOutline } from "react-icons/io5";
// import { RoundedBtn } from "../ui/roundedBtn";
// import { TransparantLoader } from "../ui/transparantLoader";
// import { VideoPlayer } from "../ui/videoPlayer";

// export const PostVideoStatus = ({setStatusType,file})=> {

//     const [isLoading,setIsLoading] = useState(false);
//     const [videoUrl,setVideoUrl] = useState(URL.createObjectURL(file))
//     const [error,setError] = useState(null);
//     const [text,setText] = useState('');


//     const handleSubmitStatus = ()=> {

//     };



//     return (
//         <div className="fixed z-50 inset-0 w-dvw h-dvh max-h-dvh flex flex-col justify-between bg-gray-900">
//             {/* Back button */}
//             <div className="m-3 w-fit bg-[#29232367] rounded-full">
//                 <RoundedBtn onClick={()=> setStatusType(null)} Icon={IoChevronBackOutline} />
//             </div>
//             <div className="fixed top-0 -z-10 left-0 w-dvw h-dvh max-h-dvh max-w-dvw flex items-center justify-center flex-1">
//                 {/* Video player*/}
//                 <VideoPlayer src={videoUrl} />
//             </div>

//             {/* footer */}
//             <PostStatusFooter 
//                 onClick={handleSubmitStatus} 
//                 isInput={true} 
//                 text={text} 
//                 setText={setText}
//                 placeholder='Add a caption' 
//                 />

//                 {/* Loader */}
//                 {isLoading && (
//                     <TransparantLoader />
//                 )}

//         </div>
//     )
// }