import {useContext, useEffect, useRef, useState } from 'react';
import { IoMic ,IoPauseCircleOutline} from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import {ChatsContext } from '../../contexts/chats.context';
import { SendMessageBtn } from './sendMessageBtn';

import AudioPlayer from '../ui/audioPlayer'
import { callTimeFormater } from '../../lib/callTimeFormater';


const AudioRecorder = () => {

  const {setMessage,setIsRecorder,setText} = useContext(ChatsContext);
    // useStates
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  //   useRefs
  const canvasRef = useRef(null);
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef();
  const [recordedTime,setRecordedTime] = useState(0)

  const intervalRef = useRef(null);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx || !analyserRef.current) return;
  
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
  
    ctx.fillStyle = 'rgb(45,56,63)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(250, 250, 250)';
    ctx.beginPath();
  
    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;
  
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;
  
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
  
      x += sliceWidth;
    }
  
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    animationRef.current = requestAnimationFrame(drawWaveform);
  };

  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/mp4;codecs=mp4a',
      'audio/mpeg',
      'audio/ogg;codecs=opus'
    ];
    return types.find(type => MediaRecorder.isTypeSupported(type)) || 'audio/webm';
  };

  const startRecording = async () => {

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const options = { mimeType: getSupportedMimeType() };
      mediaRecorderRef.current = new MediaRecorder(stream,options);
      
      // Set up audio context and analyser
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyserRef.current);
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
  
      mediaRecorderRef.current.onstop = () => {
        const type = mediaRecorderRef.current?.mimeType || 'audio/webm';
        const audioBlob = new Blob( audioChunksRef.current, { type});
        const audioFile = new File([audioBlob], 'recording.webm', {
          type: 'audio/webm',
          lastModified: Date.now()
        });

        setMessage( prev => ({...prev,type: 'MEDIA',file: audioFile}) );
        clearInterval(intervalRef.current);
        setRecordedTime(0);
        const audio_url = URL.createObjectURL(audioBlob);
        setAudioUrl(audio_url)

      };
  
      mediaRecorderRef.current.start();
      intervalRef.current = setInterval(()=>{
        setRecordedTime(prev=> prev + 1);
      },1000);
      setRecording(true);
      drawWaveform();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        setRecording(false); 
        audioChunksRef.current = []    
        cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    startRecording();
    setText('');
    return () => {
      setMessage( prev => {
        return {
          chatId: prev?.chat_id,
          sender: prev?.sender,
          contact: prev?.contact,
          text:'',
          type:'TEXT',
          status: 'SENT',
        }
      } );
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);
      audioChunksRef.current = [];
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  return (
    <div className=' absolute left-0 top-0 w-full h-full z-10 flex items-center justify-end bg-[#222e35] text-[#f7f8fa]'>
    
      <div className=' flex flex-row-reverse gap-3 items-center px-2'>
        <SendMessageBtn />
        {!recording ? (
          <button className='text-red-400' onClick={startRecording}>
            <IoMic size={30} />
          </button>
        ) : (
          <button className='text-red-400' onClick={stopRecording}>
            <IoPauseCircleOutline  size={30}/>
           </button>
        )}

        <div className={`${recording ? 'flex items-center gap-2' : 'hidden'} rounded-md bg-[rgb(45,56,63)] px-3`}>
          <canvas 
              ref={canvasRef} 
              width={250} 
              height={30} 
            />
          <p className='text-xs'>{callTimeFormater(recordedTime)}</p>
        </div>

        
        {(audioUrl && !recording) && (
          <AudioPlayer audioUrl={audioUrl}/>
        )}
        <button className='text-red-400' onClick={()=> setIsRecorder(false)}>
            <MdDelete  size={30}/>
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;