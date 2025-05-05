"use client";
import { Chat_window_context } from "@/contexts/chat_window.context";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Gallery } from "./gallery";

export const Files_preview  = () => {

    const {message,set_is_preview,set_message} = useContext(Chat_window_context);
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

    const cansel_file = ()=> {
        set_message( prev => {
            return {
              chat_id: prev?.chat_id,
              sender: prev?.sender,
              contact: prev?.contact,
              text:'',
              type:'TEXT',
              status: 'SENT',
            }
          } );
        set_is_preview(false);
    }

    return (
        <div className="bg-[#111b21] flex flex-col items-center justify-center h-full">
            <header>
                <button onClick={cansel_file}>
                    <AiOutlineClose />
                </button>
            </header>
            <Gallery 
                selected_gallery_file={selected_gallery_file} 
                />

        </div>
    );
};