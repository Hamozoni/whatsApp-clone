"use client";
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const Files_preview  = () => {

    const {message,is_file_preview} = useContext(Chat_window_context);
    const canvas_ref = useRef(null);

    useEffect(()=> {
        if(message?.file) {
            const canvas = canvas_ref.current;
            const ctx = canvas.getContext('2d');

            const reader = new FileReader();
            const image = new Image();
            reader.onload = (e)=> {
                image.src = e.target.result;
            };

            reader.readAsDataURL(message?.file);

            image.onload = ()=> {
                ctx.clearRect(0,0,canvas.width.canvas.height);
                ctx.drawImage(image,0,0,canvas.width,canvas.height);
            }
        }
    },[message])

    return (
        <div className="">
            <header>
                <button onClick={()=>is_file_preview(false)}>
                    <AiOutlineClose />
                </button>
            </header>
            <div className="">
                <canvas width={300} height={500} ref={canvas_ref} />
            </div>

        </div>
    );
};