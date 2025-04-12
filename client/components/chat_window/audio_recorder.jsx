"use client";
import { IoMicSharp } from "react-icons/io5";
import { FaRegCirclePause } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";


export const Audio_recorder = ()=> {

    const [is_recording,set_is_recording] = useState(true);
    const [audio_src,set_audio_src] = useState(null);
    const recorder_ref = useRef(null);
    const audio_chunks = useRef([]);
    const audio_ref = useRef(null);
    const canvas_ref = useRef(null);
    const analyser_ref = useRef(null);
    const animation_ref = useRef();
    const audio_context_ref = useRef(null);
    

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

        const slice_width = canvas.width * 1.0 / buffer_length;

        let x = 0;

        buffer_length.map((_,i)=> {

            const v = data_array[i] / 128.0;
            const y = v * canvas.height / 2;

            i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);

            x += slice_width;

        });

        ctx.lineTo(canvas.width,canvas.height / 2);
        ctx.stroke();

        animation_ref.current = requestAnimationFrame(draw_waveform)

    };



    const start_recording = async()=> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio:true});

            recorder_ref.current = new MediaRecorder(stream);

            audio_context_ref = new AudioContext();

            const source = audio_context_ref.current.createMediaStreamSource(stream);
            analyser_ref.current = audio_context_ref.createAnalyser();

            source.connect(analyser_ref.current);

            recorder_ref.current.ondataavailabe = (e)=> {
                audio_chunks.current.push(e.data)
            };

            recorder_ref.current.onstop = ()=> {
                const audio_blob = new Blob(audio_chunks.current,{type: 'audio/wav'});

                const audio_url = URL.createObjectURL(audio_blob);
                set_audio_src(audio_url);

                audio_chunks.current = [];

            };

            recorder_ref.current.start();

            set_is_recording(true);
            draw_waveform();
        }
        catch (er) {
            console.error(er)
        }
    };


    const stop_recording = () => {
        if(recorder_ref.current) {
            recorder_ref.current.stop();

            recorder_ref.current.stream.getTracks().forEach(track=> track.stop());

            set_is_recording(false);

            cancelAnimationFrame(animation_ref.current);
        }
    };


    const play_audio = () => {
        if(audio_ref.current && audio_src) {
            if(audio_context_ref.current && analyser_ref.current) {
                const source = audio_context_ref.current.createMediaElementSource(audio_ref.current);
                source.connect(analyser_ref.current);
                analyser_ref.current.connect(audio_context_ref.current.destination)
            };

            audio_ref.current.play();

            draw_waveform();
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