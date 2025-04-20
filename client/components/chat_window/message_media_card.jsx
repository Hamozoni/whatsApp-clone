"use client"
import Image from "next/image";
import Audio_player from "../ui/audio_player";
import { FaPlay } from "react-icons/fa6";

const Message_media_card = ({file})=> {

    return (
        <div className=" cursor-pointer">
            {
                file?.type === 'AUDIO' ?
                <Audio_player audio_url={file?.url} />:
                file?.type === 'IMAGE' ?
                <Image width={200} height={200} src={file?.url} alt='audio message' /> :
                file?.type === 'VIDEO' ? 
                <div className=" relative">
                    <video width={250} height={200} src={file?.url}  />
                    <div className=" absolute top-0 left-0 w-full h-full z-10 bg-[#ffffff4f] flex justify-center items-center">
                        <button className="flex items-center justify-center rounded-full bg-[#00000049] w-[50px] h-[50px]">
                            <FaPlay size={28} />
                        </button>
                    </div>
                </div>
                :
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