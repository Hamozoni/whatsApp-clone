"use client";
import { useCallback, useMemo, useRef } from "react";

import { FaPause } from "react-icons/fa6";
import {IoPlay} from "react-icons/io5";

import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';


const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':');

const Audio_player = ({audio_url})=> {

    const audio_container_ref = useRef(null);

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


    return (
        <div className='flex items-center gap-2 flex-1 rounded-2xl bg-[rgb(45,56,63)] px-3'>
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

        <div className="min-w-[200px] " ref={audio_container_ref} >
        </div>
        <span className="text-xs">{formatTime(currentTime)}</span>
      </div>
    )
};


export default Audio_player;