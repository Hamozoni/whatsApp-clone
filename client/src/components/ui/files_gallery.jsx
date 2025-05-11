import { useEffect, useState } from "react";

export const Files_gallery = ({file_data,is_blob = false})=> {

    const [file,set_file] = useState(null)

        useEffect(()=> {
            if(file_data && is_blob) {
                const reader = new FileReader();
                reader.onload = (e)=> {
                    set_file({url:e.target.result,type:file_data?.type?.split('/')[0]?.toUpperCase()})
                };
                reader.readAsDataURL(file_data)
            }else {
                set_file({url:file_data?.url,type:file_data?.type})
            }
        },[file_data]);

    return (
        <div className="flex items-center justify-center gap-3 w-fit mx-auto flex-1 max-h-full">
            <div className="">
                {
                    file?.type === 'IMAGE' ?
                    <img src={file?.url} width={450} height={550} alt={file?.type} />
                    : file?.type === 'VIDEO' ?
                    <video width={450} height={550} src={file?.url} controls  />
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