import { useEffect, useState } from "react";

export const MediaGalleryFile = ({fileData,isBlob = false})=> {

    const [file,setFile] = useState(null)

        useEffect(()=> {
            if(fileData && isBlob) {
                const reader = new FileReader();
                reader.onload = (e)=> {
                    setFile({url:e.target.result,type:fileData?.type?.split('/')[0]?.toUpperCase()})
                };
                reader.readAsDataURL(fileData)
            }else {
                setFile({url:fileData?.url,type:fileData?.type})
            }
        },[fileData]);

    return (
        <div className="flex items-center justify-center gap-3 w-fit mx-auto flex-1 max-h-full">
            <div className="">
                {
                    file?.type === 'IMAGE' ?
                    <img src={file?.url}  alt={file?.type} />
                    : file?.type === 'VIDEO' ?
                    <video  src={file?.url} controls  />
                    : file?.type === 'APPLICATION' &&
                    <div >
                        <iframe
                            src={
                                file?.url?.startsWith('https://res.cloudinary.com') ?  
                                `https://docs.google.com/viewer?url=${encodeURIComponent( file?.url )}&embedded=true` 
                                : file?.url
                            }
                            width="320px"
                            height="440px"
                           
                        />
                    </div>
                }
            </div>
        </div> 
    )
}