"use client";
import { IoMicSharp } from "react-icons/io5";
import { FaRegCirclePause } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";


export const Audio_recorder = ()=> {

    const [is_recording,set_is_recording] = useState(true);
    const [audio_source,set_audio_source] = useState(null);
    const recorder_ref = useRef(null);
    const audio_chunks = useRef(null);
    const audio_ref = useRef(null);
    const canvas_ref = useRef(null);
    const analyser_ref = useRef(null);
    const animation_ref = useRef();
    const context_ref = useRef(null);
    

    const draw_waveform = ()=> {
        const canvas = canvas_ref?.current;

        if(!canvas) return;

        const ctx = canvas.getContext('2d');

        if(!ctx || !analyser_ref.current) return;

        const analyser = analyser_ref.current;
        const buffer_length = analyser.frequencyBinCount;
        const data_array = new Unit8Array(buffer_length);

        analyser.getByteTimeDominData(data_array);

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();

    }

    const start_recording = async()=> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio:true});

            recorder_ref.current = new MediaRecorder(stream)
        }
        catch (er) {

        }
    }


    useEffect(()=> {

    },[])


    return (
        <div className="">
            <div className="">
                {
                    is_recording ? 
                    <FaRegCirclePause />
                    : <IoMicSharp />
                }
            </div>
            <div className="">
                {
                    is_recording ?
                    <canvas ref={canvas_ref}></canvas>
                    :<audio ref={audio_ref} src="" hidden />
                }
            </div>
            <div className=""></div>
        </div>
    )
}