"use client"
import { useEffect, useRef, useState } from "react"


export const camera_medea = ()=> {


    const [is_photo,set_is_photo] = useState(false);
    const [photo,set_photo] = useState(null);

    const video_ref = useRef(null);

    useEffect(()=> {

    },[]);



    return (
        <div className="w-full h-full">
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