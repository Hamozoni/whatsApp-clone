import { useEffect, useRef, useState } from 'react';
import { IoMic ,IoPauseCircleOutline,IoPlay,IoSend} from "react-icons/io5";
import { MdDelete } from "react-icons/md";


const Audio_recorder = ({set_is_recorder}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef();
  const audioRef = useRef(null);


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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      // Set up audio context and analyser
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyserRef.current);
      
      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };
  
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunks.current = [];
      };
  
      mediaRecorder.current.start();
      setIsRecording(true);
      drawWaveform();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      cancelAnimationFrame(animationRef.current);
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      // Connect audio element to analyser for visualization
      if (audioContextRef?.current && analyserRef.current) {
        const source = audioContextRef?.current?.createMediaElementSource(audioRef?.current);
        source?.connect(analyserRef?.current);
        analyserRef?.current?.connect(audioContextRef?.current?.destination);
      }
      
      audioRef?.current?.play();
      drawWaveform();
    }
  };

  useEffect(() => {
    startRecording()
    return () => {
      if (mediaRecorder.current) {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className=' absolute left-0 top-0 w-full h-full z-10 flex items-center justify-end bg-[#222e35] text-[#f7f8fa]'>
    
      <div className=' flex flex-row-reverse gap-3 items-center px-2'>
        <button className=' bg-emerald-400 flex justify-center items-center rounded-full p-2'>
            <IoSend size={20} />
        </button>
        {!isRecording ? (
          <button className='text-red-600' onClick={startRecording}>
            <IoMic size={28} />
          </button>
        ) : (
          <button className='text-red-600' onClick={stopRecording}>
            <IoPauseCircleOutline  size={30}/>
        </button>
        )}
          <canvas 
                className='r rounded-2xl bg-[rgb(45,56,63)] px-3' 
                ref={canvasRef} 
                width={250} 
                height={30} 
            />
        
        {(audioUrl && !isRecording) && (
          <div>
            <audio ref={audioRef} src={audioUrl} />
            <button onClick={playAudio}><IoPlay size={22}/></button>
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