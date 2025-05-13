import { IoChevronBackSharp,IoClose,IoPlay,IoChevronForwardSharp,IoPauseOutline } from "react-icons/io5";
import { PiSpeakerSimpleHighFill,PiSpeakerSimpleSlashFill } from "react-icons/pi";
import { BsEmojiSmile } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdSend } from "react-icons/md";

import { Avatar } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";

export const Status_preview = ({status,set_is_status})=> {

    const [playing_index,set_playing_index] = useState(0);
    const [timer,set_timer] = useState(0);
    const [is_playing,set_is_playing] = useState(true)
    const [is_mute,set_is_mute] = useState(false);
    const interval_ref = useRef(null);

    const handle_next_status = ()=> {
        clearInterval(interval_ref.current);
            set_is_playing(true)
            set_playing_index(prev=> {
                if(prev < status.length - 1){
                    return prev + 1
                }else {
                    set_is_status(false);
                    return 0
                }
            })
            set_timer(0);
    };

    const handle_prev_status = ()=> {
        clearInterval(interval_ref.current);
        set_is_playing(true)
        set_playing_index(prev=> {
            if(prev > 0){
                return prev - 1
            }else {
                set_is_status(false);
                return 0
            }
        })
        set_timer(0);
    }

    useEffect(()=> {
        interval_ref.current = setInterval(()=> {
                if(is_playing) {
                    set_timer(prev => {
                        if(prev < 300) {
                            return prev + 1
                        }else {
                        
                            handle_next_status()
                    
                            return 0
                        }
                    });
                };
        },[100]);

        return ()=> clearInterval(interval_ref.current);
    },[is_playing]);

    useEffect(()=> {

    },[playing_index]);

    const Prev_next_btn = ({is_prev,handle_click})=> {
        return (
            <button 
                onClick={handle_click} 
                className={`fixed ${is_prev ? 'left-1 md:left-4' : 'right-1 md:right-4'}  text-[#eee6e67c] border-2 border-[#00000010]  top-1/2 -translate-y-1/2 bg-[#00000023] rounded-full p-1 md:p-2 z-[100]`}
                >
                    {
                        is_prev ? 
                        <IoChevronBackSharp size={28} />
                        :
                        <IoChevronForwardSharp size={28} />
                    }
            </button>
        )
    }

    return (
        <div 
            style={{backgroundColor : status[playing_index]?.type === 'TEXT' ? status[playing_index].text_bg_color : '#000'}}  
            className="fixed z-30 left-0 top-0 w-dvw h-dvh p-4 flex items-center justify-center"
            >
                {
                    status[playing_index]?.type === 'TEXT' && 
                    <p 
                       className="text-xl md:text-4xl text-white"
                        style={{fontFamily:status[playing_index]?.font_family}}
                        >
                            {status[playing_index]?.text}
                    </p>
                }
            <div className="flex items-start justify-between fixed z-40 left-0 top-0 w-screen max-w-full p-4">

                                            {/* <button onClick={()=> set_is_status(false)}>
                                <IoClose  size={28} />
                            </button> */}
                <div className="w-[480px] max-w-full mx-auto">
                    <div className="flex items-center gap-1 mb-3">
                        {
                            status.map((st,i)=> (
                                <div 
                                    key={st?._id} 
                                    className="h-2 w-full flex-1 bg-[#eee6e67c] rounded-md">
                                    <div 
                                        style={{width: playing_index === i ? `${timer  / 300  * 100}%` : playing_index > i ? '100%' : '0'}} 
                                        className="h-full bg-white rounded-md"></div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button onClick={()=> set_is_status(false)}>
                                <IoChevronBackSharp size={28}  />
                            </button>
                            <Avatar size="lg" user_photo={status[0]?.user?.profile_picture} />
                            <div className="">
                                <h6>{status[0]?.user?.name}</h6>
                                <p>today at {new Date(status[playing_index]?.createdAt).toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'})}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={()=> set_is_playing(!is_playing)}>
                                {is_playing ? <IoPauseOutline size={26} /> :  <IoPlay size={26} /> }
                            </button>
                            {
                                status[playing_index].type !== 'TEXT' &&
                                <button onClick={()=> set_is_mute(!is_mute)}>
                                    {
                                        is_mute ?
                                        <PiSpeakerSimpleSlashFill size={26}/>
                                        :
                                    <PiSpeakerSimpleHighFill size={26}  />
                                    }
                                </button>
                            }
                            <button>
                                <HiDotsVertical size={26}  />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Prev_next_btn 
                is_prev={true} 
                handle_click={handle_prev_status} 
                />
            <Prev_next_btn 
                is_prev={false} 
                handle_click={handle_next_status} 
                />
            <div className="fixed z-40 left-0 bottom-0 w-screen p-4 flex items-center gap-3">
                <button>
                    <BsEmojiSmile size={28}  />
                </button>
                <input type="text" className="outline-0 p-3 border-2 border-[#00000010]  flex-1 bg-[#0000002f] rounded-md" placeholder="Type a reply..." />
                <button><MdSend size={28}  /></button>
            </div>
        </div>
    )
}