"use client"
import { useEffect, useRef, useState } from "react";


export const Media_capture = ()=> {


    const [is_photo,set_is_photo] = useState(false);
    const [photo,set_photo] = useState(null);
    const canvas_ref = useRef()

    const video_ref = useRef(null);

    useEffect(()=> {
        const initialize_camera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true, 
                    video:{facingMode: 'user'}
                });

                if(video_ref?.current) {
                    video_ref.current.srcObject = stream
                }
            }
            catch (error) {

            }
        };
        initialize_camera()
        
    },[]);



    return (
        <div className="fixed  left-0 top-0 w-full h-full z-30">
            <header>
                <span>cansel</span>
            </header>
            <div className="min-w-full min-h-[calc(100vh - 400px)] ">
                {
                    is_photo ?
                    <img className="w-full" src="" alt="" />
                    :
                    <div className="">
                        <video ref={video_ref} className="w-full min-w-[500px] min-h-[300px]" autoPlay playsInline muted></video>
                        <div className="controls">
                            {/* <button onClick={capturePhoto}>Take Photo</button>
                            <button onClick={startRecording}>Start Recording</button>
                            <button onClick={stopRecording}>Stop Recording</button> */}
                        </div>
                    </div>
                }
            </div>
            <canvas ref={canvas_ref} className="hidden" />
        </div>
    )
}