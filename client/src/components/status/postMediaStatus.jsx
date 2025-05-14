import { useEffect, useRef } from "react";
import { PostStatusFooter } from "./postStatusFooter"


export const PostMediaStatus = ({setStatusType,statusType,file})=> {

    const canvasRef = useRef()

    console.log(file);

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
             <header>
                
             </header>
            {/* disply media */}
            <div className="max-w-full max-h-full flex items-center justify-center">
                <canvas ref={canvasRef} className="max-w-full max-h-full"/>
            </div>
            {/* footer */}

            <PostStatusFooter onClick={handleSubmitStatus} />
            
        </div>
    )
}