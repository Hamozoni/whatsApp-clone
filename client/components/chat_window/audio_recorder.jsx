import { useEffect, useRef, useState } from 'react';
import { IoMic ,IoPauseCircleOutline,IoPlay,IoSend} from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPause } from "react-icons/fa6";


const Audio_recorder = ({set_is_recorder}) => {
    // useStates
  const [recording, set_recording] = useState(false);
  const [audio_url, set_audio_url] = useState(null);
  const [is_palayback,set_is_playback] = useState(false)
  //   useRefs
  const canvas_ref = useRef(null);
  const audio_chunks_ref = useRef([]);
  const media_recorder_ref = useRef(null);
  const audio_context_ref = useRef(null);
  const analyser_ref = useRef(null);
  const animation_ref = useRef();
  const audio_ref = useRef(null);


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

  const play_audio = () => {
    if (audio_ref.current && audio_url) {
      // Connect audio element to analyser for visualization;
      if (audio_context_ref?.current && analyser_ref.current) {
        const source = audio_context_ref?.current?.createMediaElementSource(audio_ref.current);
        source?.connect(analyser_ref?.current);
        analyser_ref?.current?.connect(audio_context_ref?.current?.destination);
        audio_ref?.current?.play();
        set_is_playback(true);
        draw_waveform();
      }
      
    }
  };

  const disconnect_audio_nodes = () => {
    // Get references to the nodes
    const source = audio_context_ref?.current?.createMediaElementSource(audio_ref.current);
    const analyser = analyser_ref?.current;
    const context = audio_context_ref?.current;
  
    // Disconnect in reverse order of connection
    if (analyser && context) {
      // Disconnect analyser from destination
      analyser.disconnect(context.destination);
    }
  
    if (source && analyser) {
      // Disconnect source from analyser
      source.disconnect(analyser);
    }
  
    // Optional: Clean up references
    if (source) {
      source.disconnect(); // Disconnect all outgoing connections
      // For MediaElementAudioSourceNodes, you should also do:
      audio_ref.current?.pause();
      audio_ref.current = null;
    }
  
    if (context) {
      // Close the audio context if you're done with it
      context.close().then(() => {
        audio_context_ref.current = null;
      });
    };

    media_recorder_ref.current.stop();
    media_recorder_ref.current.stream.getTracks().forEach(track => track.stop());

    cancelAnimationFrame(animation_ref.current);
  };

  const pause_audio = ()=> {

    disconnect_audio_nodes()

    audio_ref?.current?.pause();
    set_is_playback(false);
  }


  useEffect(() => {
    start_recording();
    return () => disconnect_audio_nodes()
  }, []);

  return (
    <div className=' absolute left-0 top-0 w-full h-full z-10 flex items-center justify-end bg-[#222e35] text-[#f7f8fa]'>
    
      <div className=' flex flex-row-reverse gap-3 items-center px-2'>
        <button className=' bg-emerald-400 flex justify-center items-center rounded-full p-2'>
            <IoSend size={20} />
        </button>
        {!recording ? (
          <button className='text-red-600' onClick={start_recording}>
            <IoMic size={28} />
          </button>
        ) : (
          <button className='text-red-600' onClick={stop_recording}>
            <IoPauseCircleOutline  size={30}/>
        </button>
        )}
          <canvas 
                className='r rounded-2xl bg-[rgb(45,56,63)] px-3' 
                ref={canvas_ref} 
                width={250} 
                height={30} 
            />
        <audio 
            ref={audio_ref} 
            src={audio_url} 
            onEnded={()=> {
                set_is_playback(false);
            }}
            />
        
        {(audio_url && !recording) && (
          <div>
            {
                is_palayback ?
                <button onClick={pause_audio}>
                    <FaPause size={22}/>
                </button> 
                :
                 <button onClick={play_audio}>
                    <IoPlay size={22}/>
                </button>
            }
          </div>
        )}
        <button className='text-red-500' onClick={()=> set_is_recorder(false)}>
            <MdDelete  size={30}/>
        </button>
      </div>
    </div>
  );
};

export default Audio_recorder