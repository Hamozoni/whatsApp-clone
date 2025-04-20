"use client"
import Image from "next/image";
import Audio_player from "../ui/audio_player";
import { useState } from "react";
import { IoMdOpen } from "react-icons/io";

const Message_media_card = ({file})=> {

    const [num_pages, set_num_pages] = useState(null);
    const [page_number, set_page_number] = useState(1);



    return (
        <div className=" cursor-pointer">
            {
                file?.type === 'AUDIO' ?
                <Audio_player audio_url={file?.url} />:
                file?.type === 'IMAGE' ?
                <Image width={200} height={200} src={file?.url} alt='audio message' /> :
                file?.type === 'VIDEO' ? 
                <video width={200} height={200} src={file?.url} controls />:
                <div >
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(file.url)}&embedded=true&chrome=false&toolbar=0&navpanes=0`}
                        width="100%"
                        height="100px"
                        style={{
                            border: "none",
                            pointerEvents: "none", // Disable interaction with the iframe
                            }}
                    />
              </div>
            }
        </div>
    );
};

export default Message_media_card;