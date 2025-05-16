import React, { useRef, useState, useEffect } from 'react';

export const VideoTrimmer = () => {
  const videoRef = useRef(null);
  const [videoURL, setVideoURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(30);
  const [thumbnails, setThumbnails] = useState([]);

  const MAX_TRIM = 30; // max selectable seconds
  const THUMB_COUNT = 15;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
      setStartTime(0);
      setEndTime(30);
      setThumbnails([]);
    }
  };

  const onLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
      const maxEnd = Math.min(video.duration, MAX_TRIM);
      setEndTime(maxEnd);
      generateThumbnails(video, maxEnd);
    }
  };

  const generateThumbnails = async (video, maxEnd) => {
    const thumbs = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 160;
    canvas.height = 90;

    for (let i = 0; i < THUMB_COUNT; i++) {
      const time = (maxEnd / THUMB_COUNT) * i;
      await new Promise((resolve) => {
        video.currentTime = time;
        video.onseeked = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          thumbs.push(canvas.toDataURL('image/jpeg'));
          resolve();
        };
      });
    }

    setThumbnails(thumbs);
  };

  // Trim enforcement & playback limitation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.pause();
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [endTime]);

  const handleStartChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value >= 0 && value <= endTime - 1) {
      setStartTime(value);
      if (endTime - value > MAX_TRIM) {
        setEndTime(value + MAX_TRIM);
      }
      videoRef.current.currentTime = value;
    }
  };

  const handleEndChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value <= duration && value >= startTime + 1) {
      if (value - startTime <= MAX_TRIM) {
        setEndTime(value);
      } else {
        setStartTime(value - MAX_TRIM);
        setEndTime(value);
      }
      videoRef.current.currentTime = startTime;
    }
  };

  const percent = (value) => (value / duration) * 100;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🎬 Trim 30s Max from Video</h2>

      <input
        type="file"
        accept="video/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {videoURL && (
        <>
          <video
            ref={videoRef}
            src={videoURL}
            controls
            className="w-full rounded mb-4"
            onLoadedMetadata={onLoadedMetadata}
          />

          {/* Trim Thumbnails and Slider */}
          <div className="relative mb-6">
            <div className="flex overflow-hidden rounded-md border border-gray-300">
              {thumbnails.map((thumb, idx) => (
                <img key={idx} src={thumb} alt="thumb" className="w-[60px] h-[34px] object-cover" />
              ))}
            </div>

            {/* Trim range overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
              <div
                className="absolute top-0 bottom-0 border-2 border-blue-500 bg-blue-100/20 rounded"
                style={{
                  left: `${percent(startTime)}%`,
                  width: `${percent(endTime - startTime)}%`,
                }}
              ></div>

              {/* Start ring */}
              <div
                className="absolute top-[-6px] w-3 h-10 border-2 border-blue-500 bg-white rounded-full shadow"
                style={{ left: `${percent(startTime)}%`, transform: 'translateX(-50%)' }}
              ></div>

              {/* End ring */}
              <div
                className="absolute top-[-6px] w-3 h-10 border-2 border-blue-500 bg-white rounded-full shadow"
                style={{ left: `${percent(endTime)}%`, transform: 'translateX(-50%)' }}
              ></div>
            </div>

            {/* Invisible sliders */}
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={startTime}
              onChange={handleStartChange}
              className="absolute top-[50%] w-full opacity-0 cursor-ew-resize"
            />
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={endTime}
              onChange={handleEndChange}
              className="absolute top-[50%] w-full opacity-0 cursor-ew-resize"
            />
          </div>

          {/* Time display */}
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Start: {startTime.toFixed(1)}s</span>
            <span>End: {endTime.toFixed(1)}s</span>
            <span>Selected: {(endTime - startTime).toFixed(1)}s</span>
          </div>
        </>
      )}
    </div>
  );
};

