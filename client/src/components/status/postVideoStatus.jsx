import { useEffect, useRef, useState } from 'react';

const MAX_TRIM = 30;

export const VideoTrimmer = ({ videoFile }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const thumbnailsContainerRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(MAX_TRIM);
  const [thumbnails, setThumbnails] = useState([]);

  // Load video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.onloadedmetadata = () => {
        const d = video.duration;
        setDuration(d);
        setEndTime(Math.min(d, MAX_TRIM));
        extractThumbnails(video, d);
      };
    }
  }, [videoFile]);

  // Loop trimmed section only
  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play();
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [startTime, endTime]);

  // Extract thumbnails
  const extractThumbnails = async (video, dur) => {
    const frameCount = 30;
    const interval = dur / frameCount;
    const thumbList = [];

    for (let i = 0; i < frameCount; i++) {
      const time = i * interval;
      await seekToTime(video, time);
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const dataUrl = canvasRef.current.toDataURL();
      thumbList.push(dataUrl);
    }

    setThumbnails(thumbList);
  };

  const seekToTime = (video, time) =>
    new Promise((resolve) => {
      const handler = () => {
        resolve();
        video.removeEventListener('seeked', handler);
      };
      video.addEventListener('seeked', handler);
      video.currentTime = time;
    });

  // Scroll to thumbnail when range moves
  const scrollToThumb = (time) => {
    const container = thumbnailsContainerRef.current;
    const thumbWidth = 60;
    const pos = (time / duration) * (thumbWidth * thumbnails.length);
    container.scrollTo({
      left: pos - container.offsetWidth / 2 + thumbWidth / 2,
      behavior: 'smooth',
    });
  };

  // Handle start slider
  const handleStartChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 && value < endTime) {
      setStartTime(value);
      scrollToThumb(value);
      if (endTime - value > MAX_TRIM) {
        setEndTime(value + MAX_TRIM);
      }
      videoRef.current.currentTime = value;
    }
  };

  // Handle end slider
  const handleEndChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value <= duration && value > startTime) {
      if (value - startTime <= MAX_TRIM) {
        setEndTime(value);
      } else {
        setStartTime(value - MAX_TRIM);
        setEndTime(value);
      }
      scrollToThumb(value);
      videoRef.current.currentTime = startTime;
    }
  };

  const blobURL = videoFile ? URL.createObjectURL(videoFile) : null;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <video
        ref={videoRef}
        src={blobURL}
        controls
        className="w-full rounded shadow"
        onLoadedMetadata={(e) => {
          const d = e.target.duration;
          setDuration(d);
          setEndTime(Math.min(d, MAX_TRIM));
        }}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start: {startTime.toFixed(1)}s</label>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={startTime}
          onChange={handleStartChange}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End: {endTime.toFixed(1)}s</label>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={endTime}
          onChange={handleEndChange}
          className="w-full"
        />
      </div>

      <div
        ref={thumbnailsContainerRef}
        className="flex overflow-x-auto border border-gray-300 rounded p-1 space-x-1 bg-gray-100"
      >
        {thumbnails.map((thumb, index) => (
          <img key={index} src={thumb} alt={`thumb-${index}`} className="w-[60px] h-[34px] object-cover rounded" />
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Selected duration: {(endTime - startTime).toFixed(1)}s (max {MAX_TRIM}s)
      </div>
    </div>
  );
};

