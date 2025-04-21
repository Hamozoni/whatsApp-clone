"use client";

import { Chat_window_context } from "@/contexts/chat_window.context";
import Image from "next/image";
import { useContext } from "react";


export const Media_gallery = ()=> {

    const {messages,selected_gallery_file,set_selected_gallery_file,set_is_gallery_file} = useContext(Chat_window_context);

    return (
        <div className=" fixed top-0 left-0 w-screen h-screen bg-[#000000b0] z-30">
            <header>
                <div className=""></div>
                <div className=""></div>
            </header>
            <div className="flex items-center justify-center gap-3">
                <button>prev</button>
                <div className="">
                    {
                        selected_gallery_file?.type === 'IMAGE' ?
                        <Image src={selected_gallery_file?.url} width={450} height={550} alt={selected_gallery_file?.type} />
                        : selected_gallery_file?.type === 'VIDEIO' && 
                        <video width={450} height={550} src={selected_gallery_file?.url} controls  />
                    }
                </div>
                <button>next</button>
            </div>
            <footer>
                <div className="flex justify-center items-center gap-2 overflow-x-auto">
                    {
                        messages?.map((message)=> (
                            message?.type === 'MEDIA' && (
                                <div className="">
                                    {
                                        message?.file?.type === 'IMAGE' ?
                                        <Image src={message?.file?.url} width={150} height={150} alt={message?.file?.type} /> :
                                        message?.file?.type === 'VIDEO' &&
                                        <div className=" relative">
                                            <video width={150} height={150} src={message?.file?.url}  />
                                            <div className=" absolute top-0 left-0 w-full h-full z-10 bg-[#ffffff4f] flex justify-center items-center">
                                                <button className="flex items-center justify-center rounded-full bg-[#00000049] w-[50px] h-[50px]">
                                                    <FaPlay size={28} />
                                                </button>
                                            </div>
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