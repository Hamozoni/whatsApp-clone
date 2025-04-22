"use client"
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext, useEffect, useRef, useState } from "react";


export const Media_capture = ()=> {

    const {set_is_camera} = useContext(Chat_window_context)


    const [is_photo,set_is_photo] = useState(false);
    const [photo,set_photo] = useState(null);
    const [camera_user_mode,set_camera_user_mode] = useState(true);
    const [recorded_chunks,set_recorded_chunks] = useState(null);
    const canvas_ref = useRef()
    const media_recorder = useRef()

    const video_ref = useRef(null);

    useEffect(()=> {
        const initialize_camera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true, 
                    video:{facingMode: camera_user_mode ? 'user':'environment'}
                });

                if(video_ref?.current) {
                    video_ref.current.srcObject = stream;
                    recorder = new MediaRecorder(stream);

                    recorder.ondataavailable = (e) => {
                        set_recorded_chunks(prev=> [...prev,e.data])
                    };

                    media_recorder.current = recorder
                }
            }
            catch (error) {

            }
        };
        initialize_camera();

        return ()=> {
                if(video_ref.current.srcObject){
                    const tracks = video_ref.current.srcObject.getTracks();
                    tracks.forEach(track=> track.stop());
                    media_recorder.current.stop()

                }
           
        }
        
    },[]);



    return (
        <div className="fixed  left-0 top-0 w-full h-full z-30">
            <header>
                <button onClick={()=> set_is_camera(false)}>cansel</button>
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