import { useState, useRef, useEffect } from 'react';

export const VideoTrimmer = ({ videoFile, onTrimmed }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [duration, setDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [selection, setSelection] = useState({ start: 0, end: 30 });
  const [isDragging, setIsDragging] = useState(null);
  const [trimmedVideo, setTrimmedVideo] = useState(null);

  // Video initialization and thumbnail generation
  useEffect(() => {
    if (!videoFile) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const url = URL.createObjectURL(videoFile);
    
    video.src = url;
    
    video.onloadedmetadata = async () => {
      setDuration(video.duration);
      const thumbs = await generateThumbnails(video, canvas);
      setThumbnails(thumbs);
      const initialEnd = Math.min(30, video.duration);
      setSelection({ start: 0, end: initialEnd });
    };

    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  // Auto-trim when selection changes
  useEffect(() => {
    if (duration > 0) {
      handleTrimVideo();
    }
  }, [selection, duration]);

  // Thumbnail generation
  const generateThumbnails = async (video, canvas) => {
    const thumbnailCount = Math.floor(video.duration);
    const thumbnails = [];

    for (let i = 0; i < thumbnailCount; i++) {
      const time = Math.min(i, video.duration);
      await new Promise(resolve => {
        video.currentTime = time;
        video.onseeked = () => {
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          thumbnails.push(canvas.toDataURL());
          resolve();
        };
      });
    }
    return thumbnails;
  };

  // Handle selection interactions
  const handleMouseDown = (e) => {
    const handle = e.target.closest('.handle');
    if (handle?.classList.contains('left-handle')) {
      setIsDragging('left');
    } else if (handle?.classList.contains('right-handle')) {
      setIsDragging('right');
    } else {
      setIsDragging('selection');
    }
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollLeft = container.scrollLeft;
    const totalWidth = container.scrollWidth;
    
    const rawPosition = (e.clientX - rect.left + scrollLeft) / totalWidth;
    const newPosition = Math.max(0, Math.min(1, rawPosition));
    const newTime = newPosition * duration;

    if (isDragging === 'left') {
      setSelection(prev => ({
        start: Math.max(0, newTime),
        end: Math.min(prev.start + 30, duration)
      }));
    } else if (isDragging === 'right') {
      setSelection(prev => ({
        start: Math.max(0, prev.end - 30),
        end: Math.min(newTime, duration)
      }));
    } else if (isDragging === 'selection') {
      const newStart = Math.max(0, newTime - 15);
      const newEnd = Math.min(newStart + 30, duration);
      setSelection({
        start: newStart,
        end: newEnd
      });
    }

    // Auto-scroll logic
    const cursorPos = e.clientX - rect.left;
    const edgeThreshold = 50;
    const scrollAmount = 20;

    requestAnimationFrame(() => {
      if (cursorPos < edgeThreshold) {
        container.scrollLeft -= scrollAmount;
      } else if (cursorPos > container.clientWidth - edgeThreshold) {
        container.scrollLeft += scrollAmount;
      }
    });
  };

  // Trim video functionality
  const handleTrimVideo = async () => {
    try {
      const blob = await trimVideo();
      const url = URL.createObjectURL(blob);
      setTrimmedVideo(url);
      onTrimmed(blob);
    } catch (error) {
      console.error('Trimming failed:', error);
    }
  };

  const trimVideo = async () => {
    const video = videoRef.current;
    const start = selection.start;
    const end = selection.end;
    
    return new Promise((resolve) => {
      video.currentTime = start;
      
      const chunks = [];
      const stream = video.captureStream();
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();
      video.play();

      video.ontimeupdate = () => {
        if (video.currentTime >= end) {
          mediaRecorder.stop();
          video.pause();
        }
      };

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        resolve(blob);
      };
    });
  };

  return (
    <div className="fixed left-0 top-0 w-dvw h-dvh bg-[#1f2937]">
      {/* Trimmed Video Preview */}
      <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
        <video
          controls
          src={trimmedVideo || URL.createObjectURL(videoFile)}
          className="w-full aspect-video bg-black rounded-xl"
        />
        <div className="absolute inset-0 border-2 border-white/10 rounded-xl pointer-events-none" />
      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" width="160" height="90" />

      {/* Timeline */}
      <div 
        ref={containerRef}
        className="relative group h-24 bg-gray-900/80 rounded-xl overflow-x-auto scrollbar-hide border border-white/5"
        onMouseDown={handleMouseDown}
        onMouseUp={() => setIsDragging(null)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsDragging(null)}
      >
        <div className="flex h-full gap-px" style={{ minWidth: 'max-content' }}>
          {thumbnails.map((src, i) => (
            <img 
              key={i}
              src={src}
              alt=""
              className="h-full w-auto flex-shrink-0 object-cover transition-opacity hover:opacity-80"
            />
          ))}
        </div>

        {/* Selection Overlay */}
        <div 
          className="absolute top-0 h-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 border-2 border-white/50 backdrop-blur-sm rounded-lg"
          style={{
            width: `${((selection.end - selection.start) / duration) * 100}%`,
            left: `${(selection.start / duration) * 100}%`,
          }}
        >
          <div className="absolute -left-2.5 w-5 h-full flex items-center left-handle handle">
            <div className="w-2.5 h-8 bg-white rounded-full shadow-lg cursor-ew-resize" />
          </div>
          <div className="absolute -right-2.5 w-5 h-full flex items-center right-handle handle">
            <div className="w-2.5 h-8 bg-white rounded-full shadow-lg cursor-ew-resize" />
          </div>
        </div>
      </div>

      {/* Selection Info */}
      <div className="mt-6 text-center text-gray-300 font-medium">
        <span className="text-blue-400">{Math.round(selection.start)}s</span>
        <span className="mx-2">–</span>
        <span className="text-purple-400">{Math.round(selection.end)}s</span>
        <span className="ml-2 text-gray-400">
          ({(selection.end - selection.start).toFixed(1)}s selected)
        </span>
      </div>

      {trimmedVideo && (
        <div className="mt-4 text-center">
          <p className="text-sm text-green-400">
            Trimmed video ready! Drag to adjust selection
          </p>
        </div>
      )}
    </div>
  );
};
