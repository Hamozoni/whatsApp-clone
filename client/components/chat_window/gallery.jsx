import Image from "next/image"


export const Gallery = ({selected_gallery_file})=> {

    console.log(typeof selected_gallery_file?.url)
    return (
        <div className="flex items-center justify-center gap-3 w-fit mx-auto flex-1 max-h-full">
            <div className="">
                {
                    selected_gallery_file?.type === 'IMAGE' ?
                    <Image src={selected_gallery_file?.url} width={450} height={550} alt={selected_gallery_file?.type} />
                    : selected_gallery_file?.type === 'VIDEO' ?
                    <video width={450} height={550} src={selected_gallery_file?.url} controls  />
                    : selected_gallery_file?.type === 'APPLICATION' &&
                    <div >
                        <iframe
                            src={
                                selected_gallery_file?.url?.startsWith('https://res.cloudinary.com') ?  
                                `https://docs.google.com/viewer?url=${encodeURIComponent( selected_gallery_file?.url )}&embedded=true` 
                                : selected_gallery_file?.url
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