// import { IoChevronBackSharp,IoPlay,IoChevronForwardSharp,IoPauseOutline } from "react-icons/io5";
// import { PiSpeakerSimpleHighFill,PiSpeakerSimpleSlashFill } from "react-icons/pi";
// import { BsEmojiSmile } from "react-icons/bs";
// import { HiDotsVertical } from "react-icons/hi";
// import { MdSend } from "react-icons/md";

// import { Avatar } from "../ui/avatar";
// import { useEffect, useRef, useState } from "react";

// export const Status_preview = ({status,set_is_status})=> {

//     const [playing_index,set_playing_index] = useState(0);
//     const [timer,set_timer] = useState(0);
//     const [is_playing,set_is_playing] = useState(true)
//     const [is_mute,set_is_mute] = useState(false);
//     const interval_ref = useRef(null);

//     const handle_next_status = ()=> {
//         clearInterval(interval_ref.current);
//             set_is_playing(true)
//             set_playing_index(prev=> {
//                 if(prev < status.length - 1){
//                     return prev + 1
//                 }else {
//                     set_is_status(false);
//                     return 0
//                 }
//             })
//             set_timer(0);
//     };

//     const handle_prev_status = ()=> {
//         clearInterval(interval_ref.current);
//         set_is_playing(true)
//         set_playing_index(prev=> {
//             if(prev > 0){
//                 return prev - 1
//             }else {
//                 set_is_status(false);
//                 return 0
//             }
//         })
//         set_timer(0);
//     }

//     useEffect(()=> {
//         interval_ref.current = setInterval(()=> {
//                 if(is_playing) {
//                     set_timer(prev => {
//                         if(prev < 300) {
//                             return prev + 1
//                         }else {
                        
//                             handle_next_status()
                    
//                             return 0
//                         }
//                     });
//                 };
//         },[100]);

//         return ()=> clearInterval(interval_ref.current);
//     },[is_playing,playing_index]);

//     useEffect(()=> {

//     },[playing_index]);

//     const btn_class = (is_prev)=> {
//         return `fixed ${is_prev ? 'left-1 md:left-4' : 'right-1 md:right-4'}  text-[#eee6e67c] border-2 border-[#00000010]  top-1/2 -translate-y-1/2 bg-[#00000023] rounded-full p-1 md:p-2 z-[100]`
//     }

//     return (
//         <div 
//             style={{backgroundColor : status[playing_index]?.type === 'TEXT' ? status[playing_index].text_bg_color : '#000'}}  
//             className="fixed z-30 left-0 top-0 w-dvw h-dvh p-4 flex items-center justify-center"
//             >
//                 {
//                     status[playing_index]?.type === 'TEXT' && 
//                     <p 
//                        className="text-xl md:text-4xl text-white"
//                         style={{fontFamily:status[playing_index]?.font_family}}
//                         >
//                             {status[playing_index]?.text}
//                     </p>
//                 }
//             <div className="flex items-start justify-between fixed  left-0 top-0 w-screen max-w-dvw p-4">
//                 <div className="w-[780px] max-w-full mx-auto">
//                     <div className="flex items-center gap-1 mb-3">
//                         {
//                             status.map((st,i)=> (
//                                 <div 
//                                     key={st?._id} 
//                                     className="h-2 w-full flex-1 bg-[#eee6e67c] rounded-md">
//                                     <div 
//                                         style={{width: playing_index === i ? `${timer  / 300  * 100}%` : playing_index > i ? '100%' : '0'}} 
//                                         className="h-full bg-white rounded-md"></div>
//                                 </div>
//                             ))
//                         }
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <button onClick={()=> set_is_status(false)} className="z-50">
//                                 <IoChevronBackSharp size={28}  />
//                             </button>
//                             <Avatar size="lg" user_photo={status[0]?.user?.profile_picture} />
//                             <div className="">
//                                 <h6>{status[0]?.user?.name}</h6>
//                                 <p className="text-xs">today at {new Date(status[playing_index]?.createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'})}</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <button onClick={()=> set_is_playing(!is_playing)}>
//                                 {is_playing ? <IoPauseOutline size={26} /> :  <IoPlay size={26} /> }
//                             </button>
//                             {
//                                 status[playing_index].type !== 'TEXT' &&
//                                 <button onClick={()=> set_is_mute(!is_mute)}>
//                                     {
//                                         is_mute ?
//                                         <PiSpeakerSimpleSlashFill size={26}/>
//                                         :
//                                     <PiSpeakerSimpleHighFill size={26}  />
//                                     }
//                                 </button>
//                             }
//                             <button>
//                                 <HiDotsVertical size={26}  />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <button onClick={handle_prev_status} className={btn_class(true)}>
//                 <IoChevronBackSharp size={28}/> 
//             </button>
//             <button onClick={handle_next_status} className={btn_class(false)}>
//                 <IoChevronForwardSharp size={28}/> 
//             </button>
//             <div className="fixed z-40 left-1/2 bottom-0 w-screen p-4 flex items-center gap-3 max-w-[780px] -translate-x-1/2">
//                 <button>
//                     <BsEmojiSmile size={28}  />
//                 </button>
//                 <input 
//                     type="text" 
//                     className="outline-0 px-4 py-2 border-2 border-[#00000010]  flex-1 bg-[#0000002f] rounded-full" 
//                     placeholder="Type a reply..." 
//                     />
//                 <button><MdSend size={28}  /></button>
//             </div>
//         </div>
//     )
// }

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
import { BsEmojiSmile } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdSend } from "react-icons/md";

import { Avatar } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";

export const Status_preview = ({ status, set_is_status }) => {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const intervalRef = useRef(null);

  const resetTimerAndAdvance = (advance = true) => {
    clearInterval(intervalRef.current);
    setIsPlaying(true);
    setTimer(0);
    setPlayingIndex((prev) => {
      const newIndex = advance ? prev + 1 : prev - 1;
      if (newIndex < 0 || newIndex >= status.length) {
        set_is_status(false);
        return 0;
      }
      return newIndex;
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isPlaying) {
        setTimer((prev) => {
          if (prev < 300) return prev + 1;
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
    } text-[#eee6e67c] border-2 border-[#00000010] top-1/2 -translate-y-1/2 bg-[#00000023] rounded-full p-1 md:p-2 z-[100]`;

  const currentStatus = status[playingIndex];

  return (
    <div
      style={{
        backgroundColor:
          currentStatus?.type === "TEXT"
            ? currentStatus.text_bg_color
            : "#000",
      }}
      className="fixed z-30 left-0 top-0 w-dvw h-dvh p-4 flex items-center justify-center"
    >
      {currentStatus?.type === "TEXT" && (
        <p
          className="text-xl md:text-4xl text-white"
          style={{ fontFamily: currentStatus?.font_family }}
        >
          {currentStatus?.text}
        </p>
      )}

      {/* Header */}
      <div className="flex items-start justify-between fixed left-0 top-0 w-screen max-w-dvw p-4">
        <div className="w-[780px] max-w-full mx-auto">
          {/* Progress Bars */}
          <div className="flex items-center gap-1 mb-3">
            {status.map((st, i) => (
              <div
                key={st?._id}
                className="h-2 w-full flex-1 bg-[#eee6e67c] rounded-md"
              >
                <div
                  style={{
                    width:
                      playingIndex === i
                        ? `${(timer / 300) * 100}%`
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
              <button onClick={() => set_is_status(false)} className="z-50">
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
      </div>

      {/* Navigation Buttons */}
      <button onClick={() => resetTimerAndAdvance(false)} className={btnClass(true)}>
        <IoChevronBackSharp size={28} />
      </button>
      <button onClick={() => resetTimerAndAdvance(true)} className={btnClass(false)}>
        <IoChevronForwardSharp size={28} />
      </button>

      {/* Reply Input */}
      <div className="fixed z-40 left-1/2 bottom-0 w-screen p-4 flex items-center gap-3 max-w-[780px] -translate-x-1/2">
        <button>
          <BsEmojiSmile size={28} />
        </button>
        <input
          type="text"
          className="outline-0 px-4 py-2 border-2 border-[#00000010] flex-1 bg-[#0000002f] rounded-full"
          placeholder="Type a reply..."
        />
        <button>
          <MdSend size={28} />
        </button>
      </div>
    </div>
  );
};
