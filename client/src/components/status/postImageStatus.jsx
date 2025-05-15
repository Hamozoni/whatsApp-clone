import {useContext, useEffect, useRef, useState } from "react";
import { PostStatusFooter } from "./postStatusFooter";
import { IoCrop,IoColorFilterOutline,IoChevronBackOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { RoundedBtn } from "../ui/roudedBtn";
import { post_data } from "../../lib/post_data";
import { User_context } from "../../contexts/user.context";
import { TransparantLoader } from "../ui/transparantLoader";


export const PostImageStatus = ({setStatusType,file})=> {

    const {user} = useContext(User_context);
    const canvasRef = useRef();
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(null);
    const [textOnImage,setTextOnImage] = useState('');
    const [text,setText] = useState('')
    const [activeModifier,setActiveModifier] = useState(null);
    const [image,setImage] = useState(null);

    useEffect(()=> {
        const init = ()=> {

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            
            if(file && canvasRef.current){
                
                const reader = new FileReader();
                const img = new Image();

                reader.onload = (e)=> {
                    img.src = e.target.result;

                    img.onload = ()=> {
                        canvas.width = img.width;
                        canvas.height = img.height;

                        ctx.clearRect(0,0,canvas.width,canvas.height );
                        ctx.drawImage(img,0,0)
                        setIsLoading(false)
                        setImage(img);

                    }

                };

                reader.readAsDataURL(file);
            }
        };

        init();

    },[]);

const handleSubmitStatus = async()=> {
    setIsLoading(true);
    setIsError(null)
    try {

        const formData = new FormData();

        formData.append('file',file);
        formData.append('text',text);
        formData.append('user',user._id);
        formData.append('type','MEDIA');

     const st = await post_data('status',formData);

     console.log(st);
     setStatusType(null);
    }
    catch (error) {
        setIsError(error.message)
    }
    finally{
        setIsLoading(false);
    }
};

 const handelTextOnImage = (e)=> {

       if(image) {
           const canvas = canvasRef.current;
           const ctx = canvas.getContext('2d');

           ctx.clearRect(0,0,canvas.width,canvas.height);

           ctx.drawImage(image,0,0);

           ctx.font = '40px Arial';
           ctx.fillStyle = 'white';
           ctx.fillText(e.target.value,50,50);

       }

    };



    return (
        <div className="fixed z-50 inset-0 w-dvw h-dvh max-h-dvh flex flex-col justify-between bg-gray-950">
             {/* Header */}
             <header className="bg-[#413e3e46]">
                 <div className="container mx-auto max-w-[970px] flex items-center justify-between gap-3 p-4">
                    {/* Back button */}
                    <RoundedBtn 
                            Icon={IoChevronBackOutline} 
                            onClick={()=> setStatusType(null)} 
                            isActive={activeModifier === 'back'}
                            />
                        {/* Modifing image buttons */}
                    <div className="flex items-center justify-end md:justify-center gap-3 flex-1">
                        <RoundedBtn 
                            Icon={IoCrop} 
                            onClick={()=> setActiveModifier(prev=> prev === 'crop' ? null : 'crop')}
                            isActive={activeModifier === 'crop'}
                            />
                        <RoundedBtn 
                            Icon={IoColorFilterOutline} 
                            onClick={()=> setActiveModifier(prev=> prev === 'filter' ? null : 'filter')}
                            isActive={activeModifier === 'filter'}
                            />
                        <RoundedBtn 
                            Icon={FaPencilAlt} 
                            onClick={()=> setActiveModifier(prev=> prev === 'pen' ? null : 'pen')}
                            isActive={activeModifier === 'pen'}
                            />
                        <RoundedBtn 
                            Icon={RiText} 
                            onClick={()=> {
                                setActiveModifier(prev=> prev === 'text' ? null : 'text');
                            }} 
                            isActive={activeModifier === 'text'}
                            />
                    </div>
                    {/* Done button*/}
                    {
                        activeModifier && 
                            <RoundedBtn 
                                Icon={MdOutlineDone} 
                                onClick={()=> setActiveModifier(null)} 
                                isActive={false}
                                />
                    }

                 </div>
             </header>
            {/* Disply image */}
            <div className="fixed left-0 top-0 p-3 -z-10   w-dvw h-dvh max-h-dvh flex items-center justify-center flex-1">
                <div className=" relative">
                    {/* Image canvas */}
                    <canvas 
                        ref={canvasRef} 
                        className="w-[600px] max-w-full max-h-full"
                        />
                    {/* Text on image input */}
                    {
                        activeModifier === 'text'&&
                        <div className=" absolute left-1/2 top-1/2 -translate-1/2">
                            <input 
                                type="text" 
                                className="outline-0 px-4 py-2 border-2 text-black border-[#00000010] flex-1 bg-white rounded-full"
                                onChange={handelTextOnImage}
                                />
                        </div>

                    }

                </div>
            </div>
            {/* Footer */}

            <PostStatusFooter 
                isInput={true} 
                text={text} 
                setText={setText} 
                onClick={handleSubmitStatus}
                placeholder='Add a caption'
                 />

                {/* Loader */}
                {isLoading && (
                    <TransparantLoader />
                )}
            
        </div>
    )
}