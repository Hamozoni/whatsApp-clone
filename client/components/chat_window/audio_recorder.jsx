import {useContext, useEffect, useRef, useState } from 'react';
import { IoMic ,IoPauseCircleOutline,IoSend} from "react-icons/io5";
import { MdDelete } from "react-icons/md";


import dynamic from 'next/dynamic';
import { Chat_window_context } from '@/contexts/chat_window.context';
import { handle_send_message } from '@/lib/handle_send_message';
import { User_context } from '@/contexts/user.context';

const Audio_player = dynamic(()=> import('../ui/audio_player'),{ssr:false});


const Audio_recorder = ({set_is_recorder}) => {

  const {set_message,message,active_chat,set_active_chat} = useContext(Chat_window_context);
  const {set_chats,socket} = useContext(User_context)
    // useStates
  const [recording, set_recording] = useState(false);
  const [audio_url, set_audio_url] = useState(null);
  const [loading, set_loading] = useState(null);
  const [error, set_error] = useState(null);
  //   useRefs
  const canvas_ref = useRef(null);
  const audio_chunks_ref = useRef([]);
  const media_recorder_ref = useRef(null);
  const audio_context_ref = useRef(null);
  const analyser_ref = useRef(null);
  const animation_ref = useRef();




  const draw_waveform = () => {
    const canvas = canvas_ref.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx || !analyser_ref.current) return;
  
    const analyser = analyser_ref.current;
    const buffer_length = analyser.frequencyBinCount;
    const data_array = new Uint8Array(buffer_length);
    analyser.getByteTimeDomainData(data_array);
  
    ctx.fillStyle = 'rgb(45,56,63)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(250, 250, 250)';
    ctx.beginPath();
  
    const slice_width = canvas.width * 1.0 / buffer_length;
    let x = 0;
  
    for (let i = 0; i < buffer_length; i++) {
      const v = data_array[i] / 128.0;
      const y = v * canvas.height / 2;
  
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
  
      x += slice_width;
    }
  
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    animation_ref.current = requestAnimationFrame(draw_waveform);
  };

  const get_supported_mime_type = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/mp4;codecs=mp4a',
      'audio/mpeg',
      'audio/ogg;codecs=opus'
    ];
    return types.find(type => MediaRecorder.isTypeSupported(type)) || 'audio/webm';
  };

  const start_recording = async () => {

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const options = { mimeType: get_supported_mime_type() };
      media_recorder_ref.current = new MediaRecorder(stream,options);
      
      // Set up audio context and analyser
      audio_context_ref.current = new AudioContext();
      const source = audio_context_ref.current.createMediaStreamSource(stream);
      analyser_ref.current = audio_context_ref.current.createAnalyser();
      source.connect(analyser_ref.current);
      
      media_recorder_ref.current.ondataavailable = (e) => {
        audio_chunks_ref.current.push(e.data);
      };
  
      media_recorder_ref.current.onstop = () => {
        const type = media_recorder_ref.current?.mimeType || 'audio/webm';
        const audio_blob = new Blob( audio_chunks_ref.current, { type});
        const audio_file = new File([audio_blob], 'recording.webm', {
          type: 'audio/webm',
          lastModified: Date.now()
        });

        set_message( prev => ({...prev,type: 'MEDIA',file: audio_file}) )
        const audio_url = URL.createObjectURL(audio_blob);
        set_audio_url(audio_url)

      };
  
      media_recorder_ref.current.start();
      set_recording(true);
      draw_waveform();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };
  
  const stop_recording = () => {
    if (media_recorder_ref.current) {
        media_recorder_ref.current.stop();
        media_recorder_ref.current.stream.getTracks().forEach(track => track.stop());
        set_recording(false); 
        audio_chunks_ref.current = []    
        cancelAnimationFrame(animation_ref.current);
    }
  };

  useEffect(() => {
    start_recording();
    return () => {
      media_recorder_ref.current.stop();
      media_recorder_ref.current.stream.getTracks().forEach(track => track.stop());
      set_recording(false);
      audio_chunks_ref.current = [];
      cancelAnimationFrame(animation_ref.current);
    }
  }, []);


  const handle_send = ()=> {
     handle_send_message({
        message,
        set_loading,
        set_error,
        set_chats,
        active_chat,
        set_active_chat,
        socket
     });

     if(!error) {
        set_is_recorder(false);
     }
  }

  return (
    <div className=' absolute left-0 top-0 w-full h-full z-10 flex items-center justify-end bg-[#222e35] text-[#f7f8fa]'>
    
      <div className=' flex flex-row-reverse gap-3 items-center px-2'>
        <button onClick={handle_send} className=' bg-emerald-400 flex justify-center items-center rounded-full p-2'>
            <IoSend size={20} />
        </button>
        {!recording ? (
          <button className='text-red-400' onClick={start_recording}>
            <IoMic size={30} />
          </button>
        ) : (
          <button className='text-red-400' onClick={stop_recording}>
            <IoPauseCircleOutline  size={30}/>
           </button>
        )}

          <canvas 
              className={`${recording ? 'visible' : 'hidden'} rounded-2xl bg-[rgb(45,56,63)] px-3`}
              ref={canvas_ref} 
              width={250} 
              height={30} 
            />
        
        {(audio_url && !recording) && (
          <Audio_player audio_url={audio_url}/>
        )}
        <button className='text-red-400' onClick={()=> set_is_recorder(false)}>
            <MdDelete  size={30}/>
        </button>
      </div>
    </div>
  );
};

export default Audio_recorder