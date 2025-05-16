import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa"


export const VideoPlayer = ({src})=> {

    const [isPlaying,setIsPlaying] = useState(false);
    const [isVideoControlsBtn,setIsVideoControlsBtn] = useState(true);
    const videoRef = useRef(null);
    const timeOutRef = useRef(null)

    const handlePlayPause = ()=> {

        if(isPlaying){
            setIsPlaying(false);
            setIsVideoControlsBtn(true);
            videoRef.current.pause();
            clearTimeout(timeOutRef.current)
        }else {
            setIsPlaying(true)
            videoRef.current.play();
            timeOutRef.current =  setTimeout(()=>  {
                setIsVideoControlsBtn(false)
        },[1500]);
        }

    };

    return (
        <div className=" relative w-full h-full max-w-full max-h-full flex items-center justify-center">
            <video 
                onClick={handlePlayPause} 
                src={src}
                ref={videoRef}  
                className="max-h-dvh max-w-dvw" 
                />
                {/* Video control button */}
                {
                    isVideoControlsBtn && (
                        <button 
                            onClick={handlePlayPause}
                            className=" absolute top-1/2 left-1/2  -translate-1/2 p-4 rounded-full text-white bg-[#2926263a]"
                            >
                                {
                                    isPlaying ? 
                                    <FaPause  size={28}/>: <FaPlay size={28} />
                                }
                            
                        </button>

                    )
                }
        </div>
    )
}