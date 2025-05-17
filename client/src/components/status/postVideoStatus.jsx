import { useState, useRef, useEffect } from 'react';

export const VideoTrimmer = ({ videoFile }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  // Load video and generate thumbnails
  useEffect(() => {
    if (!videoFile || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const url = URL.createObjectURL(videoFile);

    // Add null check before setting src
    if (video) {
      video.src = url;
    }

    const handleLoadedMetadata = async () => {
      try {
        const dur = video.duration;
        setDuration(dur);
        const end = Math.min(30, dur);
        setSelection({ start: 0, end });

        // Create thumbnails at 1-second intervals
        const thumbs = [];
        for (let i = 0; i < dur; i++) {
          await seekToTime(video, i);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            thumbs.push(canvas.toDataURL());
          }
        }
        setThumbnails(thumbs);
      } catch (error) {
        console.error('Error generating thumbnails:', error);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      URL.revokeObjectURL(url);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoFile]);

  // Play selected segment on loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selection) return;

    const checkLoop = () => {
      if (!video) return;
      if (video.currentTime >= selection.end) {
        video.currentTime = selection.start;
        video.play();
      }
    };

    video.currentTime = selection.start;
    video.play();
    video.addEventListener('timeupdate', checkLoop);

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', checkLoop);
      }
    };
  }, [selection]);

  const seekToTime = (video, time) =>
    new Promise((resolve) => {
      if (!video) return resolve();
      
      video.currentTime = time;
      const handler = () => {
        video.removeEventListener('seeked', handler);
        resolve();
      };
      video.addEventListener('seeked', handler);
    });

  // Update selection based on click
  const handleThumbnailClick = (index) => {
    const start = index;
    const end = Math.min(index + 30, duration);
    setSelection({ start, end });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-white space-y-4">
      {/* Video Preview */}
      <video 
        ref={videoRef} 
        controls 
        className="w-full aspect-video rounded-xl bg-black"
        onError={(e) => console.error('Video error:', e)}
      />

      {/* Hidden canvas */}
      <canvas ref={canvasRef} width="160" height="90" className="hidden" />

      {/* Thumbnails */}
      <div className="flex overflow-x-auto gap-1 rounded-md border border-white/10 p-2 bg-gray-800">
        {thumbnails.map((src, i) => (
          <div
            key={i}
            onClick={() => handleThumbnailClick(i)}
            className={`relative cursor-pointer border-2 ${
              i >= selection.start && i < selection.end ? 'border-blue-400' : 'border-transparent'
            }`}
          >
            <img 
              src={src} 
              alt="" 
              className="w-20 h-auto object-cover rounded"
              onError={(e) => {
                e.target.style.display = 'none';
                console.error('Thumbnail load error:', src);
              }}
            />
            {i === selection.start && (
              <div className="absolute top-0 left-0 w-full h-full border-2 border-green-400 rounded" />
            )}
            {i === selection.end - 1 && (
              <div className="absolute top-0 left-0 w-full h-full border-2 border-red-400 rounded" />
            )}
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-300">
        Playing from <span className="text-green-400">{selection.start}s</span> to{' '}
        <span className="text-red-400">{selection.end}s</span>
      </div>
    </div>
  );
};