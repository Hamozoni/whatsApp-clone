import { useRef, useState } from "react";
import { PostStatusFooter } from "./postStatusFooter";


export const PostVideoStatus = ({setStatusType,file})=> {

    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [text,setText] = useState(false);
    const videoRef = useRef(null)
    const handleSubmitStatus = ()=> {

    }

    return (
        <div className="fixed z-50 inset-0 w-dvw h-dvh max-h-dvh flex flex-col justify-between bg-gray-950">

            <div className="">
                <video ref={videoRef} src="" />
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
                <div className="fixed inset-0 bg-[#00000060] flex items-center justify-center z-[80]">
                    <BeatLoader />
                </div>
                )}

        </div>
    )
}