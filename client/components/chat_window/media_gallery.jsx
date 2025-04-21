"use client";

import { Chat_window_context } from "@/contexts/chat_window.context";
import Image from "next/image";
import { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { GrNext,GrPrevious  } from "react-icons/gr";


export const Media_gallery = ()=> {

    const {messages,selected_gallery_file,set_selected_gallery_file,set_is_gallery_file} = useContext(Chat_window_context);

    return (
        <div onClick={(e)=> {
            console.log(e.target.classList.contains('parent'))
            if(e.target.classList.contains('parent')){
                set_is_gallery_file(false)
            }
        }} className=" fixed top-0 left-0 w-screen h-screen bg-[#000000da] z-30 parent flex flex-col justify-between">
            <header className="flex items-center justify-between h-[70px] bg-black">
                <div className=""></div>
                <div className=""></div>
            </header>
            <div className="flex items-center justify-center gap-3 w-fit mx-auto">
                <button className="flex items-center justify-center rounded-full bg-[#817d7d49] w-[50px] h-[50px]">
                    <GrPrevious size={28} />
                </button>
                <div className="">
                    {
                        selected_gallery_file?.type === 'IMAGE' ?
                        <Image src={selected_gallery_file?.url} width={450} height={550} alt={selected_gallery_file?.type} />
                        : selected_gallery_file?.type === 'VIDEO' ?
                        <video width={450} height={550} src={selected_gallery_file?.url} controls  />
                        : 
                        <div className="">
                            <iframe
                                src={`https://docs.google.com/viewer?url=${encodeURIComponent(selected_gallery_file?.url)}&embedded=true`}
                                width="450px"
                                height="550px"
                            />
                        </div>
                    }
                </div>
                <button className="flex items-center justify-center rounded-full bg-[#5c5a5a49] w-[50px] h-[50px]">
                    <GrNext size={28} />
                </button>
            </div>
            <footer className="border-t-[1px] border-b-cyan-900 bg-black p-2">
                <div className="flex justify-center items-center gap-2 overflow-x-auto">
                    {
                        messages?.map((message)=> (
                            message?.type === 'MEDIA' && (
                                <div key={message?._id} className="">
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
                                        :
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