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
    video.src = url;

    const handleLoadedMetadata = async () => {
      try {
        const dur = video.duration;
        setDuration(dur);
        const end = Math.min(30, dur);
        setSelection({ start: 0, end });

        // Generate thumbnails
        const thumbs = [];
        for (let i = 0; i < dur; i++) {
          await new Promise((resolve) => {
            video.currentTime = i;
            video.onseeked = () => {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                thumbs.push(canvas.toDataURL());
              }
              resolve();
            };
          });
        }
        setThumbnails(thumbs);
      } catch (error) {
        console.error('Error loading video:', error);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      URL.revokeObjectURL(url);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoFile]);

  // Handle video playback loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selection) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= selection.end) {
        video.currentTime = selection.start;
        video.play();
      }
    };

    video.currentTime = selection.start;
    video.play();
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [selection]);

  // Handle thumbnail click selection
  const handleThumbnailClick = (index) => {
    const start = Math.max(0, index);
    const end = Math.min(index + 30, duration);
    setSelection({ start, end });
  };

  return (
    <div className="fixed left-0 top-0 bg-green-950 w-dvw h-dvh">
      {/* Video Preview */}
      <video
        ref={videoRef}
        controls
        className="w-full aspect-video rounded-xl bg-black"
        onError={(e) => console.error('Video error:', e)}
      />

      {/* Hidden canvas for thumbnail generation */}
      <canvas ref={canvasRef} width="160" height="90" className="hidden" />

      {/* Thumbnail timeline */}
      <div className="flex overflow-x-auto gap-1 rounded-md border border-white/10 p-2 bg-gray-800">
        {thumbnails.map((src, i) => (
          <div
            key={i}
            onClick={() => handleThumbnailClick(i)}
            className={`relative cursor-pointer border-2 ${
              i >= selection.start && i < selection.end 
                ? 'border-blue-400' 
                : 'border-transparent'
            }`}
          >
            <img
              src={src}
              alt=""
              className="min-w-20 h-auto object-cover rounded"
              onError={(e) => {
                e.target.style.display = 'none';
                console.error('Failed to load thumbnail:', src);
              }}
            />
            {i === selection.start && (
              <div className="absolute inset-0 border-2 border-green-400 rounded" />
            )}
            {i === selection.end - 1 && (
              <div className="absolute inset-0 border-2 border-red-400 rounded" />
            )}
          </div>
        ))}
      </div>

      {/* Selection info */}
      <div className="text-center text-sm text-gray-300">
        Selected: {Math.floor(selection.start)}s - {Math.floor(selection.end)}s
        <br />
        ({(selection.end - selection.start).toFixed(1)} seconds)
      </div>
    </div>
  );
};