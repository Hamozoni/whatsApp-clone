"use client"
import Image from "next/image";
import Audio_player from "../ui/audio_player";


export const Message_media_card = ({file})=> {
    return (
        <div className="">
            {
                file?.type === 'AUDIO' ?
                <Audio_player audio_url={file?.url} />:
                file?.type === 'IMAGE' || file?.type === 'APPLICATION'  ?
                <Image width={200} height={200} src={file?.url} alt='audio message' /> :
                file?.type === 'VIDEO' ? 
                <video width={200} height={200} src={file?.url} controls />:''
            }
        </div>
    );
}