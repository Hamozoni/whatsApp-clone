import { useRef, useState, useEffect } from 'react';
import { FaPause, FaPlay } from "react-icons/fa";
import { MdArrowLeft ,MdArrowRight} from "react-icons/md";
import { PostStatusFooter } from './postStatusFooter';
import { post_data } from '../../lib/post_data';
import { TransparantLoader } from '../ui/transparantLoader';
import { RoundedBtn } from '../ui/roundedBtn';
import { MdArrowBackIosNew } from "react-icons/md";
import { User_context } from '../../contexts/user.context';
import { useContext } from 'react';

export function VideoTrimmer({ videoFile,setStatusType }) {

  const {user} = useContext(User_context);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const selectionRef = useRef(null);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  const [videoURL, setVideoURL] = useState('');
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text,setText] = useState('')

  // Constants
  const MAX_DURATION = 30;
  const THUMB_WIDTH = 60;
  const THUMB_HEIGHT = 40;
  const AUTO_SCROLL_THRESHOLD = 50;
  const AUTO_SCROLL_SPEED = 10;
  const AUTO_SCROLL_INTERVAL = 50;

  const dragInfo = useRef({ dragging: false, type: null });
  const autoScrollTimer = useRef(null);

    // ... existing state and refs ...
 const [progress, setProgress] = useState(0);

  // Start trimming process
  const startTrimming = async () => {
    try {
      setIsLoading(true);
      setError(null);
      recordedChunks.current = [];
      
      const video = videoRef.current;
      video.currentTime = startTime;

      // Wait for video to be ready
      await new Promise(resolve => {
        video.onloadedmetadata = resolve;
      });

      // Setup media recorder
      const stream = video.captureStream();
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      // Collect data chunks
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.current.push(e.data);
        }
      };

      // Finalize recording
      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(recordedChunks.current, {
          type: 'video/webm'
        });
        
        // Create proper file object
        const trimmedFile = new File([blob], `trimmed-video-${Date.now()}.webm`, {
          type: 'video/webm',
          lastModified: Date.now()
        });

        // Send to server
        await sendToServer(trimmedFile);
      };

      // Start recording
      mediaRecorder.current.start();
      video.play();

      // Update progress
      const updateProgress = () => {
        if (!video.paused && !video.ended) {
          const percent = (video.currentTime / video.duration) * 100;
          setProgress(percent);
          requestAnimationFrame(updateProgress);
        }
      };
      updateProgress();

    } catch (err) {
      setError('Error starting trimming process');
      console.error(err);
    }
  };

  // Stop trimming and finalize file
  const stopTrimming = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      videoRef.current.pause();
      setIsLoading(false);
      setProgress(0);
    }
  };

  // Send file to backend
  const sendToServer = async (file) => {
    try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text',text);
    formData.append('user',user._id);
    formData.append('type','MEDIA');

    // 3. Send to your Express endpoint
     const st =  await post_data('status',formData);

     console.log(st);


    } catch (err) {
      setError('Error uploading trimmed video');
      console.error(err);
    }
    finally {
      setStatusType(null);
      setIsLoading(false)
    }
  };
  // Video initialization
  useEffect(() => {
    if (!videoFile) return;

    const video = videoRef.current;
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);

    const onLoaded = () => {
      const duration = video.duration;
      setVideoDuration(duration);
      setStartTime(0);
      setEndTime(Math.min(MAX_DURATION, duration));
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', onLoaded);
    return () => {
      URL.revokeObjectURL(url);
      video.removeEventListener('loadedmetadata', onLoaded);
    };
  }, [videoFile]);

  // Handle video playback within selection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        if (isPlaying) video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [startTime, endTime, isPlaying]);

  // Update playback when selection changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime < startTime || video.currentTime > endTime) {
      video.currentTime = startTime;
    }
  }, [startTime, endTime]);

  // Generate thumbnails
  useEffect(() => {
    if (!videoDuration || !videoURL) return;

    const generateThumbnails = async () => {
      const video = document.createElement('video');
      video.src = videoURL;
      await new Promise(resolve => video.addEventListener('loadedmetadata', resolve));

      const count = Math.min(Math.ceil(videoDuration), 60);
      const canvas = document.createElement('canvas');
      canvas.width = THUMB_WIDTH;
      canvas.height = THUMB_HEIGHT;
      const ctx = canvas.getContext('2d');
      const thumbs = [];

      for (let i = 0; i < count; i++) {
        video.currentTime = (i * videoDuration) / count;
        await new Promise(resolve => video.addEventListener('seeked', resolve));
        ctx.drawImage(video, 0, 0, THUMB_WIDTH, THUMB_HEIGHT);
        thumbs.push(canvas.toDataURL());
      }

      setThumbnails(thumbs);
      setIsLoading(false)
    };

    generateThumbnails();
  }, [videoDuration, videoURL]);

  // Pointer handlers and selection logic remain mostly the same...

  // Add play/pause control
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Pointer move handler (shared for left/right/center dragging)
  const onPointerMove = (e) => {

    if (!dragInfo.current.dragging) return;

    const { type, offsetX, startX: initialX, startTime: initialStart, endTime: initialEnd } = dragInfo.current;

    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();
    console.log(container.getBoundingClientRect())
    const pointerX = e.clientX;
    const scrollLeft = container.scrollLeft;
    const relativeX = pointerX - rect.left + scrollLeft;
    const totalWidth = thumbnails.length * THUMB_WIDTH;

    let newStart = startTime;
    let newEnd = endTime;

    if (type === 'left') {
      // Calculate new startTime from pointer, then clamp
      let newStartTime = (relativeX - offsetX) / totalWidth * videoDuration;
      newStartTime = Math.max(0, Math.min(newStartTime, initialEnd));
      if (initialEnd - newStartTime > MAX_DURATION) {
        newStartTime = initialEnd - MAX_DURATION;
      }
      newStart = newStartTime;
    } else if (type === 'right') {
      // Calculate new endTime from pointer, then clamp
      let newEndTime = (relativeX - offsetX) / totalWidth * videoDuration;
      newEndTime = Math.max(initialStart, Math.min(newEndTime, videoDuration));
      if (newEndTime - initialStart > MAX_DURATION) {
        newEndTime = initialStart + MAX_DURATION;
      }
      newEnd = newEndTime;
    } else if (type === 'center') {
      // Move both start and end by deltaTime based on pointer movement
      const dx = pointerX - initialX;
      const dt = dx / totalWidth * videoDuration;
      let tempStart = initialStart + dt;
      let tempEnd = initialEnd + dt;
      if (tempStart < 0) {
        tempEnd -= tempStart;
        tempStart = 0;
      }
      if (tempEnd > videoDuration) {
        tempStart -= (tempEnd - videoDuration);
        tempEnd = videoDuration;
      }
      newStart = tempStart;
      newEnd = tempEnd;
    }

    // Update state (React will reposition the overlay in render)
    setStartTime(newStart);
    setEndTime(newEnd);

    // Auto-scroll logic: if pointer is near left/right edge, scroll container
    if (pointerX - rect.left < AUTO_SCROLL_THRESHOLD) {
      if (!autoScrollTimer.current) {
        autoScrollTimer.current = setInterval(() => {
          container.scrollLeft = Math.max(0, container.scrollLeft - AUTO_SCROLL_SPEED);
        }, AUTO_SCROLL_INTERVAL);
      }
    } else if (rect.right - pointerX < AUTO_SCROLL_THRESHOLD) {
      if (!autoScrollTimer.current) {
        autoScrollTimer.current = setInterval(() => {
          container.scrollLeft = Math.min(container.scrollWidth, container.scrollLeft + AUTO_SCROLL_SPEED);
        }, AUTO_SCROLL_INTERVAL);
      }
    } else {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
    }
  };

  // Stop dragging (called on pointerup)
  const stopDragging = () => {
    dragInfo.current.dragging = false;
    dragInfo.current.type = null;
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', stopDragging);
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  // Pointer down on left handle
  const onPointerDownLeft = (e) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pointerX = e.clientX;
    const scrollLeft = container.scrollLeft;
    const relativeX = pointerX - rect.left + scrollLeft;
    const totalWidth = thumbnails.length * THUMB_WIDTH;
    const selectionLeft = (startTime / videoDuration) * totalWidth;
    const offsetX = relativeX - selectionLeft;
    dragInfo.current = {
      dragging: true,
      type: 'left',
      startX: pointerX,
      startTime,
      endTime,
      offsetX,
    };
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopDragging);
  };

  // Pointer down on right handle
  const onPointerDownRight = (e) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pointerX = e.clientX;
    const scrollLeft = container.scrollLeft;
    const relativeX = pointerX - rect.left + scrollLeft;
    const totalWidth = thumbnails.length * THUMB_WIDTH;
    const selectionEnd = (endTime / videoDuration) * totalWidth;
    const offsetX = relativeX - selectionEnd;
    dragInfo.current = {
      dragging: true,
      type: 'right',
      startX: pointerX,
      startTime,
      endTime,
      offsetX,
    };
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopDragging);
  };

  // Pointer down on center (middle) of selection
  const onPointerDownCenter = (e) => {
    e.preventDefault();
    // Ignore clicks on the handle elements themselves
    if (e.target.dataset.handle) return;
    const pointerX = e.clientX;

    dragInfo.current = {
      dragging: true,
      type: 'center',
      startX: pointerX,
      startTime,
      endTime,
      initialStart: startTime,
      initialEnd: endTime,
    };
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopDragging);
  };

  // Calculate selection overlay position in px
  const contentWidth = thumbnails.length * THUMB_WIDTH;
  const selectionLeftPx = videoDuration ? (startTime / videoDuration) * contentWidth : 0;
  const selectionWidthPx = videoDuration ? ((endTime - startTime) / videoDuration) * contentWidth : 0;



  return (
    <div className='bg-neutral-900 fixed left-0 top-0 z-50 w-dvw h-dvh'>
          <section className=" relative flex items-center justify-center h-dvh">
          {/* Thumbnails timeline */}
              <div className=" absolute top-1 left-1/2 -translate-x-1/2 w-full flex justify-center gap-1 h-fit z-50  max-w-[950px]">
                 <RoundedBtn onClick={()=> setStatusType(false)} Icon={MdArrowBackIosNew} />
                <div
                  ref={containerRef}
                  className='relative overflow-x-auto whitespace-nowrap w-fit boreder border-#ccc'
                >
                  <div
                    ref={contentRef}
                    className={` relative w-[${contentWidth}px]`}
                  >
                    {/* Thumbnail images */}
                    {thumbnails.map((thumb, index) => (
                      <img
                        key={index}
                        src={thumb}
                        className={`inline-block w-[${THUMB_WIDTH}px]`}
                        alt={`thumb-${index}`}
                      />
                    ))}

                    {/* Selection overlay (render only after video is loaded) */}
                    {videoDuration > 0 && (
                      <div
                        ref={selectionRef}
                        className={` absolute top-0 h-full flex cursor-move  border border-[#224b42be] bg-[#224b427e]`}
                        onPointerDown={onPointerDownCenter}
                        style={{
                          width: `${selectionWidthPx}px`,
                          left: `${selectionLeftPx}px`
                        }}
                      >
                        {/* Left resize handle */}
                        <div
                          data-handle="left"
                          className='bg-[#224b42be] h-full p-0 cursor-ew-resize flex items-center justify-center'
                          onPointerDown={onPointerDownLeft}
                        > <MdArrowLeft size={24} /> </div>
                        {/* Center area (flexible) */}
                        <div style={{ flex: 1 }} />
                        {/* Right resize handle */}
                        <div
                          data-handle="right"
                          className='bg-[#224b42be] h-full cursor-ew-resize flex items-center p-0 justify-center'
                          onPointerDown={onPointerDownRight}
                        > <MdArrowRight size={24} /> </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            {/* Video player */}
            <div className='flex justify-center items-center relative max-h-dvh'>
              <video
                ref={videoRef}
                src={videoURL}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const seekTime = ((e.clientX - rect.left) / rect.width) * videoDuration;
                  videoRef.current.currentTime = Math.max(startTime, Math.min(endTime, seekTime));
                }}

                className='max-h-dvh w-full max-w-[950px]'
              />
              <button
                onClick={togglePlayback}
                className='absolute top-1/2 left-1/2  -translate-1/2 p-4 rounded-full text-white bg-[#2926263a]'
              >
                {
                    isPlaying ? 
                    <FaPause  size={28}/>: <FaPlay size={28} />
                }
              </button>
            </div>

          </section>

          {/* Footer */}
          <div className="fixed left-0 bottom-0 w-dvw z-50">
            <PostStatusFooter 
                onClick={startTrimming} 
                isInput={true} 
                placeholder='Add a caption' 
                text={text} 
                setText={setText}
                />

          </div>

          {/* loader */}

          {
            isLoading && <TransparantLoader />
          }
    </div>
  );
}
