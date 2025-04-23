"use client";
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Gallery } from "./gallery";

export const Files_preview  = () => {

    const {message,set_is_preview} = useContext(Chat_window_context);
    const [selected_gallery_file,set_selected_gallery_file] = useState(null);

    useEffect(()=> {
        if(message?.file) {
            console.log(message?.file)

            const reader = new FileReader();
            reader.onload = (e)=> {

                console.log(typeof e.target.result)
                set_selected_gallery_file({url:e.target.result,type:message?.file?.type?.split('/')[0]?.toUpperCase()})
            };
            reader.readAsDataURL(message?.file)

        }
    },[message]);

    return (
        <div className="bg-[#111b21] flex flex-col items-center justify-center h-full">
            <header>
                <button onClick={()=>set_is_preview(false)}>
                    <AiOutlineClose />
                </button>
            </header>
            <Gallery 
                selected_gallery_file={selected_gallery_file} 
                />

        </div>
    );
};