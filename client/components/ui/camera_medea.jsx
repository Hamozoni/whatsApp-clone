"use client"
import { useEffect, useRef, useState } from "react"


export const camera_medea = ({video_src})=> {


    const [is_photo,set_is_photo] = useState(false);
    const [photo,set_photo] = useState(null);

    const video_ref = useRef(null);

    useEffect(()=> {
        video_ref.current.srcObject = video_src
    },[]);



    return (
        <div className=" absolute left-2 bottom-0 translate-y-[102%] w-full">
            <header><span>cansel</span></header>
            <div className="min-w-full min-h-[calc(100vh - 400px)] ">
                {
                    is_photo ?
                    <img className="w-full" src="" alt="" />
                    :
                    <video ref={video_ref} className="w-full min-w-[500px] min-h-[550px]" autoPlay muted></video>
                }
            </div>
        </div>
    )
}