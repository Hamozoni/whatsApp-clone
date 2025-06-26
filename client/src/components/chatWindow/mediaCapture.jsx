import { ChatsContext } from "../../contexts/chats.context";
import { useContext, useEffect, useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";


export const MediaCapture = ()=> {

    const {setIsCamera,setNessage,setIsPreview} = useContext(ChatsContext)
    const [photo,setPhoto] = useState(null);
    const [cameraUserMode,setCameraUserMode] = useState(true);
    const [recordedChunks,setRecordedChunks] = useState(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);

    const videoRef = useRef(null);

    useEffect(()=> {
        const initializeCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true, 
                    video:{facingMode: cameraUserMode ? 'user':'environment'},
                });

                if(videoRef?.current) {
                    streamRef.current = stream;
                    videoRef.current.srcObject = streamRef.current;
                    recorder = new MediaRecorder(streamRef.current);

                    recorder.ondataavailable = (e) => {
                        setRecordedChunks(prev=> [...prev,e.data])
                    };

                    mediaRecorderRef.current = recorder
                }
            }
            catch (error) {
                console.log(error.message);
            }
        };
        initializeCamera();

        return ()=> {
                if(streamRef.current){
                    const tracks = streamRef.current.getTracks();
                    tracks.forEach(track=> track.stop());

                }
           
        }
        
    },[]);

    const capturePhoto = ()=> {
        if(!canvasRef.current || !videoRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video,0,0,canvas.width,canvas.height);

        canvas.toBlob((blob)=>{
            if(!blob) return;
            const file = new File([blob],`captured_photo_${Date.now()}.png`,{
                type:'image/png'
            });

            setNessage(prev=> ({...prev,type: 'MEDIA',file}));
        },'image/png')

        setIsPreview(true);
        setIsCamera(false)

    }



    return (
        <div className="w-full h-full bg-[#111b21]">
            <header>
                <button onClick={()=> setIsCamera(false)}>cansel</button>
            </header>
            <div className="max-w-full w-[450px] mx-auto relative">
                <video ref={videoRef} className="w-full min-w-[500px] min-h-[300px]" autoPlay playsInline muted></video>
                <button onClick={capturePhoto} className=" absolute bottom-0 left-1/2 translate-x-1/2 translate-y-1/2 bg-emerald-600 rounded-full p-3">
                    <BsFillCameraFill size={30} />
                </button>
            </div>

            <canvas ref={canvasRef} className=" hidden" />
        </div>
    )
}