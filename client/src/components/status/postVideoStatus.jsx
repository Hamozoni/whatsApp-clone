import { useRef, useState, useEffect } from 'react';

const MAX_DURATION = 30;

export const VideoTrimmer = ({ videoFile }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    if (!videoFile) return;
    const video = videoRef.current;
    const url = URL.createObjectURL(videoFile);
    video.src = url;

    video.onloadedmetadata = async () => {
      const dur = video.duration;
      const end = Math.min(MAX_DURATION, dur);
      setDuration(dur);
      setSelection({ start: 0, end });
      const thumbs = await generateThumbnails(video, canvasRef.current);
      setThumbnails(thumbs);
    };

    return () => {
      URL.revokeObjectURL(video.src);
    };
  }, [videoFile]);

  // Keep playback within selection range
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkTime = () => {
      if (video.currentTime >= selection.end) {
        video.pause();
        video.currentTime = selection.start;
        video.play();
      }
    };

    video.addEventListener('timeupdate', checkTime);
    return () => video.removeEventListener('timeupdate', checkTime);
  }, [selection]);

  const generateThumbnails = async (video, canvas) => {
    const interval = 1; // 1 second per frame
    const thumbs = [];
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < Math.floor(video.duration); i += interval) {
      await new Promise((resolve) => {
        video.currentTime = i;
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          thumbs.push(canvas.toDataURL());
          resolve();
        };
      });
    }

    return thumbs;
  };

  const handleMouseDown = (e, handle) => setDragging(handle);
  const handleMouseUp = () => setDragging(null);

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = Math.max(0, Math.min(duration, percent * duration));

    setSelection((prev) => {
      if (dragging === 'left') {
        const newStart = Math.min(time, prev.end);
        return {
          start: newStart,
          end: Math.min(newStart + MAX_DURATION, duration),
        };
      } else if (dragging === 'right') {
        const newEnd = Math.max(time, prev.start);
        return {
          start: Math.max(0, newEnd - MAX_DURATION),
          end: newEnd,
        };
      }
      return prev;
    });
  };

  const handlePlay = () => {
    const video = videoRef.current;
    video.currentTime = selection.start;
    video.play();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg space-y-6">
      {/* Video Preview */}
      <video
        ref={videoRef}
        controls
        className="w-full rounded-lg bg-black"
        onPlay={handlePlay}
      />

      {/* Hidden canvas for thumbnails */}
      <canvas ref={canvasRef} width={160} height={90} className="hidden" />

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="relative flex overflow-x-auto border border-gray-700 bg-gray-800 rounded-lg px-1 py-2"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {thumbnails.map((src, i) => (
          <img key={i} src={src} className="w-24 h-16 object-cover" />
        ))}

        {/* Selected area overlay */}
        <div
          className="absolute top-0 bottom-0 bg-white/20 border-2 border-blue-400 rounded pointer-events-none"
          style={{
            left: `${(selection.start / duration) * 100}%`,
            width: `${((selection.end - selection.start) / duration) * 100}%`,
          }}
        />

        {/* Handles */}
        <div
          className="absolute top-0 bottom-0 w-3 bg-blue-400 cursor-ew-resize"
          style={{
            left: `${(selection.start / duration) * 100}%`,
            transform: 'translateX(-50%)',
          }}
          onMouseDown={() => handleMouseDown(null, 'left')}
        />
        <div
          className="absolute top-0 bottom-0 w-3 bg-blue-400 cursor-ew-resize"
          style={{
            left: `${(selection.end / duration) * 100}%`,
            transform: 'translateX(-50%)',
          }}
          onMouseDown={() => handleMouseDown(null, 'right')}
        />
      </div>

      <div className="text-center text-gray-400">
        Selected:{" "}
        <span className="text-blue-400">
          {selection.start.toFixed(1)}s - {selection.end.toFixed(1)}s
        </span>{" "}
        ({(selection.end - selection.start).toFixed(1)}s)
      </div>
    </div>
  );
};

