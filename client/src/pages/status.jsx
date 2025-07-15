import { useContext, useState } from "react"
import { UserContext } from "../contexts/user.context";
import { GrFormAdd } from "react-icons/gr";
import { StatusMenuModel } from "../components/status/statusMenuModel";
import { PostTextStatus } from "../components/status/postTextStatus";
import { StatusCard } from "../components/status/statusCard";
import { Avatar } from "../components/ui/avatar";
import {PostImageStatus } from "../components/status/postImageStatus";
import{ VideoTrimmer }from "../components/status/postVideoStatus";

import { SiGradleplaypublisher } from "react-icons/si";
import { MdLockOutline } from "react-icons/md";
import { CloseModel } from "../components/modal/closeModel";


export const Status = ()=> {

    const {user,status} = useContext(UserContext);
    const [isUpdate,setIsUpdate] = useState(false);
    const [statusType,setStatusType] = useState(null);
    const [file,setFile] = useState(null);

    return (
        <div className="flex h-full gap-1">
            <div className=" p-3 flex-1 w-full md:w-[380px] min-w-[380px] max-w-full rounded-lg bg-p">
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
                            <CloseModel setCloseModel={setIsUpdate} />
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
            <div className="hidden bg-s rounded-lg md:flex flex-2 flex-col p-4 justify-center">
                <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center">
                    <SiGradleplaypublisher size={40} />
                    <div className="">
                        <h6 className="text-2xl">Share status updates</h6>
                        <p className="text-gray-400">Share photos, videos and text that disappear after 24 hours.</p>
                    </div>

                </div>
                <h6 className="w-full flex justify-center items-center text-gray-400">
                    <MdLockOutline /> Your status updates are end-to-end encrypted
                </h6>
            </div>
        </div>
    )
};