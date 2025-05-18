import React, { useRef, useState, useEffect } from 'react';

export function VideoTrimmer({ videoFile, width = 600, height = 90 }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const selectionRef = useRef(null);

  const [videoURL, setVideoURL] = useState('');

  const [videoDuration, setVideoDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  // Constants
  const MAX_DURATION = 30; // seconds
  const THUMB_WIDTH = 60;
  const THUMB_HEIGHT = 40;
  const AUTO_SCROLL_THRESHOLD = 50; // px from edges to start auto scroll
  const AUTO_SCROLL_SPEED = 10; // px per interval
  const AUTO_SCROLL_INTERVAL = 50; // ms

  const dragInfo = useRef({
    dragging: false,
    type: null, // 'left', 'right', or 'center'
    startX: 0,
    startTime: 0,
    endTime: 0,
    offsetX: 0,
  });
  const autoScrollTimer = useRef(null);

  // When video metadata loads, initialize duration and trim range (0 to 30s)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoFile) return;
    const onLoaded = () => {
      const duration = video.duration;
      setVideoDuration(duration);
      setStartTime(0);
      setEndTime(Math.min(MAX_DURATION, duration));
      video.currentTime = 0;
      video.pause();
    };
    video.addEventListener('loadedmetadata', onLoaded);
    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
    };
  }, [videoFile]);

  // Pause playback if it exceeds the trim endTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.currentTime > endTime) {
        video.pause();
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [endTime]);

  
  useEffect(() => {
    if (!videoFile) return;
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);

    return () => URL.revokeObjectURL(url); // cleanup
  }, [videoFile]);

  // Generate thumbnails once we know videoDuration
  useEffect(() => {
    if (!videoDuration) return;
    const generateThumbnails = async () => {
      if (!videoURL) return;
      // Create a hidden video element for frame capture
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoURL;
      // Wait for metadata to load (duration known):contentReference[oaicite:4]{index=4}
      await new Promise((resolve) => {
        video.addEventListener('loadedmetadata', resolve, { once: true });
      });
      const duration = video.duration;
      // Limit to max 60 thumbnails to avoid performance issues
      let count = Math.ceil(duration);
      count = Math.min(count, 60);
      const interval = duration / count;
      const canvas = document.createElement('canvas');
      canvas.width = THUMB_WIDTH;
      canvas.height = THUMB_HEIGHT;
      const ctx = canvas.getContext('2d');
      const thumbs = [];

      for (let i = 0; i < count; i++) {
        video.currentTime = interval * i;
        // Wait for seek operation to finish
        await new Promise((resolve) => {
          video.addEventListener('seeked', resolve, { once: true });
        });
        // Draw the current frame onto the canvas:contentReference[oaicite:5]{index=5}
        ctx.drawImage(video, 0, 0, THUMB_WIDTH, THUMB_HEIGHT);
        // Convert canvas to an image data URL:contentReference[oaicite:6]{index=6}
        thumbs.push(canvas.toDataURL('image/png'));
      }
      setThumbnails(thumbs);
    };
    generateThumbnails();
  }, [videoDuration, videoURL]);

  // Pointer move handler (shared for left/right/center dragging)
  const onPointerMove = (e) => {
    if (!dragInfo.current.dragging) return;
    const { type, offsetX, startX: initialX, startTime: initialStart, endTime: initialEnd } = dragInfo.current;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
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
      {/* Video player */}
      <video
        ref={videoRef}
        src={videoURL}
        controls
        style={{ width: '100%', maxWidth: width + 'px', marginBottom: '10px' }}
      />
      {/* Thumbnails timeline */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          width: width + 'px',
          border: '1px solid #ccc',
        }}
      >
        <div
          ref={contentRef}
          style={{
            position: 'relative',
            height: THUMB_HEIGHT + 'px',
            width: contentWidth + 'px',
          }}
        >
          {/* Thumbnail images */}
          {thumbnails.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              style={{
                display: 'inline-block',
                width: THUMB_WIDTH + 'px',
                height: THUMB_HEIGHT + 'px',
              }}
              alt={`thumb-${index}`}
            />
          ))}

          {/* Selection overlay (render only after video is loaded) */}
          {videoDuration > 0 && (
            <div
              ref={selectionRef}
              style={{
                position: 'absolute',
                top: 0,
                left: selectionLeftPx + 'px',
                width: selectionWidthPx + 'px',
                height: THUMB_HEIGHT + 'px',
                background: 'rgba(0,123,255,0.2)',
                border: '2px solid #007bff',
                boxSizing: 'border-box',
                display: 'flex',
                cursor: 'move',
              }}
              onPointerDown={onPointerDownCenter}
            >
              {/* Left resize handle */}
              <div
                data-handle="left"
                style={{
                  width: '10px',
                  background: '#007bff',
                  cursor: 'ew-resize',
                }}
                onPointerDown={onPointerDownLeft}
              />
              {/* Center area (flexible) */}
              <div style={{ flex: 1 }} />
              {/* Right resize handle */}
              <div
                data-handle="right"
                style={{
                  width: '10px',
                  background: '#007bff',
                  cursor: 'ew-resize',
                }}
                onPointerDown={onPointerDownRight}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
