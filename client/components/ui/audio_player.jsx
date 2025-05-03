"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FaPause } from "react-icons/fa6";
import {IoPlay} from "react-icons/io5";

import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import {time_formater } from "@/utils/time_formater";



const Audio_player = ({audio_url})=> {

    const audio_container_ref = useRef(null);
    const [duration,set_duraction]= useState(0)

    const {wavesurfer,isPlaying,currentTime} = useWavesurfer({
        container: audio_container_ref,
        height: 30,
        waveColor: 'rgb(250,250,250)',
        progressColor: 'rgb(200,100,200)',
        url: audio_url,
        plugings: useMemo(()=> [Timeline.create()] ,[])
      });

    const on_play_pause = useCallback(() => {
        wavesurfer && wavesurfer.playPause()
    }, [wavesurfer]);


    useEffect(()=> {
        if(!wavesurfer)return;

        const on_ready = ()=> {
            const dur = wavesurfer.getDuration()
            set_duraction(dur)
        };

        wavesurfer.on('ready',on_ready);
        return ()=> wavesurfer.un('ready',on_ready)
    },[wavesurfer]);


    return (
        <div className='flex items-center gap-2 flex-1 rounded-sm bg-[rgba(255,255,255,0.12)] px-3'>
        {
            isPlaying ?
            <button onClick={on_play_pause}>
                <FaPause size={22}/>
            </button> 
            :
             <button onClick={on_play_pause}>
                <IoPlay size={22}/>
            </button>
            
        }

         <span className="text-xs">{time_formater(currentTime)}</span>
        <div className="min-w-[200px] " ref={audio_container_ref} >
        </div>
        <span className="text-xs">{time_formater(duration)}</span>
      </div>
    )
};


export default Audio_player;