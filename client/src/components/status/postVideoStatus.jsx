import { useEffect, useRef, useState } from "react";
import { PostStatusFooter } from "./postStatusFooter";
import { IoChevronBackOutline } from "react-icons/io5";
import { RoundedBtn } from "../ui/roundedBtn";
import { TransparantLoader } from "../ui/transparantLoader";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

export const PostVideoStatus = ({setStatusType,file})=> {

    const [isLoading,setIsLoading] = useState(false);
    const [videoUrl,setVideoUrl] = useState(URL.createObjectURL(file))
    const [error,setError] = useState(null);
    const [text,setText] = useState('');
    const [isPlaying,setIsPlaying] = useState(false);
    const [isVideoControlsBtn,setIsVideoControlsBtn] = useState(true);
    const videoRef = useRef(null);
    const timeOutRef = useRef(null)


    const handleSubmitStatus = ()=> {

    };

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

    }

    return (
        <div className="fixed z-50 inset-0 w-dvw h-dvh max-h-dvh flex flex-col justify-between bg-gray-900">
            {/* Back button */}
            <div className="m-3 w-fit bg-[#29232367] rounded-full">
                <RoundedBtn onClick={()=> setStatusType(null)} Icon={IoChevronBackOutline} />
            </div>
            <div className="fixed top-0 -z-10 left-0 w-dvw h-dvh max-h-dvh max-w-dvw flex items-center justify-center flex-1">
                {/* Display selected video */}
                <video 
                    onClick={handlePlayPause} 
                    src={videoUrl}
                    ref={videoRef}  
                    className="max-h-dvh max-w-dvw" 
                    />
                    {/* Video control button */}
                    {
                        isVideoControlsBtn && (
                            <button 
                                onClick={handlePlayPause}
                                className="fixed top-1/2 left-1/2  -translate-1/2 p-4 rounded-full text-white bg-[#2926263a]"
                                >
                                    {
                                        isPlaying ? 
                                        <FaPause  size={28}/>: <FaPlay size={28} />
                                    }
                                
                            </button>

                        )
                    }
            </div>

            {/* footer */}
            <PostStatusFooter 
                onClick={handleSubmitStatus} 
                isInput={true} 
                text={text} 
                setText={setText}
                placeholder='Add a caption' 
                />

                {/* Loader */}
                {isLoading && (
                    <TransparantLoader />
                )}

        </div>
    )
}