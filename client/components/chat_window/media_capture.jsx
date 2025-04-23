"use client"
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext, useEffect, useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";


export const Media_capture = ()=> {

    const {set_is_camera,set_message,set_is_preview} = useContext(Chat_window_context)
    const [photo,set_photo] = useState(null);
    const [camera_user_mode,set_camera_user_mode] = useState(true);
    const [recorded_chunks,set_recorded_chunks] = useState(null);
    const media_recorder = useRef(null);
    const stream_ref = useRef(null);
    const canvas_ref = useRef(null);

    const video_ref = useRef(null);

    useEffect(()=> {
        const initialize_camera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true, 
                    video:{facingMode: camera_user_mode ? 'user':'environment'},
                });

                if(video_ref?.current) {
                    stream_ref.current = stream
                    video_ref.current.srcObject = stream_ref.current;
                    recorder = new MediaRecorder(stream_ref.current);

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
                if(stream_ref.current){
                    const tracks = stream_ref.current.getTracks();
                    tracks.forEach(track=> track.stop());

                }
           
        }
        
    },[]);

    const capture_photo = ()=> {
        if(!canvas_ref.current || !video_ref.current) return;

        const canvas = canvas_ref.current;
        const ctx = canvas.getContext('2d');
        const video = video_ref.current;

        canvas.width = video.width;
        canvas.height = video.height;

        ctx.drawImage(video,0,0,canvas.width,canvas.height);

        const file = new File(canvas.toDataURL('image/png'));


        set_message(prev=> ({...prev,type: 'MEDIA',file}));
        set_is_preview(true);
        set_is_camera(false)

    }



    return (
        <div className="w-full h-full bg-[#111b21]">
            <header>
                <button onClick={()=> set_is_camera(false)}>cansel</button>
            </header>
            <div className="max-w-full w-[450px] mx-auto relative">
                <video ref={video_ref} className="w-full min-w-[500px] min-h-[300px]" autoPlay playsInline muted></video>
                <button onClick={capture_photo} className=" absolute bottom-0 left-1/2 translate-x-1/2 translate-y-1/2 bg-emerald-600 rounded-full p-3">
                    <BsFillCameraFill size={30} />
                </button>
            </div>

            <canvas ref={canvas_ref} className=" hidden" />
        </div>
    )
}