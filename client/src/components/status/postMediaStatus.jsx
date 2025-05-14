import { useEffect, useRef } from "react";
import { PostStatusFooter } from "./postStatusFooter";
import { IoCrop,IoColorFilterOutline,IoChevronBackOutline } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { RoundedBtn } from "../ui/roudedBtn";


export const PostMediaStatus = ({setStatusType,statusType,file})=> {

    const canvasRef = useRef()

    useEffect(()=> {
        const init = ()=> {

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            
            if(file && canvasRef.current){
                
                const reader = new FileReader();
                const image = new Image();

                reader.onload = (e)=> {
                    image.src = e.target.result;

                    image.onload = ()=> {
                        canvas.width = image.width;
                        canvas.height = image.height;

                        ctx.clearRect(0,0,canvas.width,canvas.height );
                        ctx.drawImage(image,0,0)


                    }

                };

                reader.readAsDataURL(file)
            }
        };

        init();

    },[]);

    const handleSubmitStatus = ()=> {
        setStatusType(null)
    }
    return (
        <div className="fixed z-50 inset-0 w-dvw h-dvh max-h-dvh flex flex-col justify-between bg-gray-950">
             {/* header */}
             <header className="flex items-center justify-between p-4 bg-[#00000046]">
                   {/* back button */}
                  <RoundedBtn Icon={IoChevronBackOutline} onClick={()=> setStatusType(null)} />
                    {/* modifing image buttons */}
                 <div className="flex items-center gap-3">
                    <RoundedBtn Icon={IoCrop} onClick={()=> ''} />
                    <RoundedBtn Icon={IoColorFilterOutline} onClick={()=> ''} />
                    <RoundedBtn Icon={FaPencilAlt} onClick={()=> ''} />
                    <RoundedBtn Icon={RiText} onClick={()=> ''} />
                 </div>
             </header>
            {/* disply media */}
            <div className="fixed left-0 top-0 p-3 -z-10   w-dvw h-dvh max-h-dvh flex items-center justify-center flex-1">
                <canvas ref={canvasRef} className="w-[600px] max-w-full max-h-full"/>
            </div>
            {/* footer */}

            <PostStatusFooter onClick={handleSubmitStatus} />
            
        </div>
    )
}