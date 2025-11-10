import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FaPause } from "react-icons/fa6";
import {IoPlay} from "react-icons/io5";

import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import {callTimeFormater } from "../../lib/callTimeFormater.js";



const AudioPlayer = ({audioUrl})=> {

    const audioContainerRef = useRef(null);
    const [duration,setDuraction]= useState(0)

    const {wavesurfer,isPlaying,currentTime} = useWavesurfer({
        container: audioContainerRef,
        height: 30,
        waveColor: 'rgb(250,250,250)',
        progressColor: 'rgb(200,100,200)',
        url: audioUrl,
        plugings: useMemo(()=> [Timeline.create()] ,[])
      });

    const onPlayPause = useCallback(() => {
        wavesurfer && wavesurfer.playPause()
    }, [wavesurfer]);

    useEffect(()=> {
        if(!wavesurfer)return;

        const onReady = ()=> {
            const dur = wavesurfer.getDuration()
            setDuraction(dur)
        };

        wavesurfer.on('ready',onReady);
        return ()=> wavesurfer.un('ready',onReady)
    },[wavesurfer]);


    return (
        <div className='flex items-center justify-center gap-1 flex-1 rounded-sm p-1 bg-[#00000017]'>
            {
                isPlaying ?
                <button onClick={onPlayPause}>
                    <FaPause size={22}/>
                </button> 
                :
                <button onClick={onPlayPause}>
                    <IoPlay size={22}/>
                </button>
                
            }

            <span className="text-xs w-fit">{callTimeFormater(currentTime)}</span>
            <div className="flex-1 min-w-[120px]" ref={audioContainerRef} ></div>
            <span className="text-xs w-fit">{callTimeFormater(duration)}</span>
      </div>
    )
};


export default AudioPlayer;