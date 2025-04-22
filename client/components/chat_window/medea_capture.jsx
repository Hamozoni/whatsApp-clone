"use client"
import { useEffect, useRef, useState } from "react";


export const Medea_capture = ()=> {


    const [is_photo,set_is_photo] = useState(false);
    const [photo,set_photo] = useState(null);

    const video_ref = useRef(null);

    useEffect(()=> {

    },[]);



    return (
        <div className="w-full h-full">
            <header>
                <span>cansel</span>
            </header>
            <div className="min-w-full min-h-[calc(100vh - 400px)] ">
                {
                    is_photo ?
                    <img className="w-full" src="" alt="" />
                    :
                    <div className="">
                        <video ref={video_ref} className="w-full min-w-[500px] min-h-[300px]" autoPlay muted></video>
                        <div className="controls">
                            <button onClick={capturePhoto}>Take Photo</button>
                            <button onClick={startRecording}>Start Recording</button>
                            <button onClick={stopRecording}>Stop Recording</button>
                        </div>
                    </div>
                }
            </div>
            <canvas ref={canvas_ref} className="hidden" />
        </div>
    )
}