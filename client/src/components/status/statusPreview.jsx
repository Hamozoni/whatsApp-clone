import {
  IoChevronBackSharp,
  IoPlay,
  IoChevronForwardSharp,
  IoPauseOutline,
} from "react-icons/io5";
import {
  PiSpeakerSimpleHighFill,
  PiSpeakerSimpleSlashFill,
} from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import { MdSend } from "react-icons/md";

import { Avatar } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";
import { TextEmojiInput } from "../ui/textEmojiInput";
import { VideoPlayer } from "../ui/videoPlayer";

export const StatusPreview = ({ status, setIsStatus }) => {

  const [text,setText] = useState('')
  const [playingIndex, setPlayingIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [duration,setDuration] = useState(300)
  const intervalRef = useRef(null);

  const resetTimerAndAdvance = (advance = true) => {
    clearInterval(intervalRef.current);
    setIsPlaying(true);
    setTimer(0);
    setPlayingIndex((prev) => {
      const newIndex = advance ? prev + 1 : prev - 1;
      if (newIndex < 0 || newIndex >= status.length) {
        setIsStatus(false);
        return 0;
      }
      return newIndex;
    });
  };

    const currentStatus = status[playingIndex];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isPlaying) {
        let d = currentStatus.type === 'MEDIA' ? currentStatus.file.duration * 10 || 300 : 300
        setDuration(d)
        setTimer((prev) => {
          if (prev < d) return prev + 1;
          resetTimerAndAdvance(true);
          return 0;
        });
      }
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, playingIndex]);

  const btnClass = (isPrev) =>
    `fixed ${
      isPrev ? "left-1 md:left-4" : "right-1 md:right-4"
    } text-[#eee6e67c] border-2 border-[#00000010] top-1/2 w-[200px] h-dvh opacity-0 sm:opacity-100  sm:w-fit sm:h-fit -translate-y-1/2 bg-[#00000023] rounded-full p-1 md:p-2 -z-10`;


  return (
    <div
      style={{
        backgroundColor:
          currentStatus?.type === "TEXT"
            ? currentStatus.text_bg_color
            : "#000",
      }}
      className="fixed z-30 left-0 top-0 w-dvw h-dvh flex flex-col justify-between"
    >

      {/* Header */}
      <header className="bg-[#413f3f5e] p-3">
        <div className=" container max-w-[650px] mx-auto">
          {/* Progress Bars */}
          <div className="flex items-center gap-1 mb-3 ">
            {status.map((st, i) => (
              <div
                onClick={()=> setPlayingIndex(i)}
                key={st?._id}
                className="h-2 w-full flex-1 bg-[#eee6e67c] rounded-md"
              >
                <div
                  style={{
                    width:
                      playingIndex === i
                        ? `${(timer / duration) * 100}%`
                        : playingIndex > i
                        ? "100%"
                        : "0",
                  }}
                  className="h-full bg-white rounded-md"
                />
              </div>
            ))}
          </div>

          {/* User Info + Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsStatus(false)} className="z-50">
                <IoChevronBackSharp size={28} />
              </button>
              <Avatar size="lg" user_photo={status[0]?.user?.profile_picture} />
              <div>
                <h6>{status[0]?.user?.name}</h6>
                <p className="text-xs">
                  today at{" "}
                  {new Date(currentStatus?.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <IoPauseOutline size={26} />
                ) : (
                  <IoPlay size={26} />
                )}
              </button>

              {currentStatus.type !== "TEXT" && (
                <button onClick={() => setIsMute(!isMute)}>
                  {isMute ? (
                    <PiSpeakerSimpleSlashFill size={26} />
                  ) : (
                    <PiSpeakerSimpleHighFill size={26} />
                  )}
                </button>
              )}

              <button>
                <HiDotsVertical size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Status text */}
      {currentStatus?.type === "TEXT" ? (
        <p
          className="text-xl md:text-4xl text-white text-center p-4 -z-20"
          style={{ fontFamily: currentStatus?.font_family }}
        >
          {currentStatus?.text}
        </p>
      ) : (
        // Status media
        <div className="flex items-center justify-center fixed -z-10 left-0 top-0 h-dvh  w-dvw max-h-dvh">
          {
            currentStatus?.file?.type === "IMAGE" ? (
                <img src={currentStatus.file.url} alt="status image" />
            ) : currentStatus?.file?.type === "VIDEO" && (
              <VideoPlayer src={currentStatus.file.url} isAutoPlay={true} />
            )
          }
          {
            // Media Text
            currentStatus.text.length && (
            <p className=" fixed left-0 w-full bottom-[68px] text-sm sm:text-xl md:text-2xl text-white px-2 bg-[#2e2a2a52] text-center"> 
                {currentStatus.text}
            </p>

            )
          }
        </div>
      ) 
    }

      {/* Navigation Buttons */}
      <button onClick={() => resetTimerAndAdvance(false)} className={btnClass(true)}>
        <IoChevronBackSharp size={28} />
      </button>
      <button onClick={() => resetTimerAndAdvance(true)} className={btnClass(false)}>
        <IoChevronForwardSharp size={28} />
      </button>

      {/* Reply Input */}
      <footer className="bg-[#413f3f5e] p-3">
        <div className="container max-w-[650px] mx-auto flex items-center gap-3">
          <TextEmojiInput text={text}  setText={setText} placeholder='Type a reply...'/>
          <button>
            <MdSend size={28} />
          </button>

        </div>
      </footer>
    </div>
  );
};
