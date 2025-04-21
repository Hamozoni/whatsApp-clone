"use client";

import { Chat_window_context } from "@/contexts/chat_window.context";
import Image from "next/image";
import { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { Gallery } from "./gallery";


export const Media_gallery = ()=> {

    const {
        messages,
        selected_gallery_file,
        set_selected_gallery_file,
        set_is_gallery_file
    } = useContext(Chat_window_context);

    const handle_close_media = (e)=> {
        console.log(e.target.classList.contains('parent'))
        if(e.target.classList.contains('parent')){
            set_is_gallery_file(false)
        }
    };
    
    return (
        <div 
            onClick={handle_close_media} 
            className=" fixed top-0 left-0 w-screen h-screen bg-[#000000ef] z-30 parent flex flex-col justify-between"
            >
            <header className="flex items-center justify-between h-[70px] bg-black">
                <div className=""></div>
                <div className=""></div>
            </header>
            <Gallery selected_gallery_file={selected_gallery_file} />
            <footer className="border-t-[1px] border-b-cyan-950 bg-black p-2 max-full overflow-x-auto min-h-fit">
                <div className="flex justify-center items-center min-w-fit gap-2 ">
                    {
                        messages?.map((message)=> (
                           ( message?.type === 'MEDIA' && message?.file?.type !== 'AUDIO' ) && (
                                <div 
                                    key={message?._id} 
                                    className={`rounded-xl overflow-hidden border-4 border-cyan-950 h-[70px] w-[70px] flex justify-center items-center ${selected_gallery_file?._id === message?.file?._id && 'scale-75 border-cyan-400'}`}>
                                    {
                                        message?.file?.type === 'IMAGE' ?
                                        <Image onClick={()=> set_selected_gallery_file(message?.file)} src={message?.file?.url} width={70} height={70} alt={message?.file?.type} /> :
                                        message?.file?.type === 'VIDEO' ?
                                        <div className=" relative">
                                            <video width={70} height={70} src={message?.file?.url}  />
                                            <div className=" absolute top-0 left-0 w-full h-full z-10 bg-[#ffffff4f] flex justify-center items-center">
                                                <button onClick={()=> set_selected_gallery_file(message?.file)} className="flex items-center justify-center rounded-full bg-[#00000049] w-[50px] h-[50px]">
                                                    <FaPlay size={28} />
                                                </button>
                                            </div>
                                        </div>
                                        :  message?.file?.type === 'APPLICATION' &&
                                        <div onClick={()=> set_selected_gallery_file(message?.file)} className=" cursor-pointer" >
                                                <iframe
                                                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(message?.file?.url)}&embedded=true&chrome=false&toolbar=0&navpanes=0`}
                                                    width="70px"
                                                    height="70px"
                                                    style={{
                                                        border: "none",
                                                        pointerEvents: "none", // Disable interaction with the iframe
                                                        }}
                                                />
                                        </div>
                                    }
                                </div>
                            )
                        ))
                    }
                </div>
            </footer>
        </div>
    )
}