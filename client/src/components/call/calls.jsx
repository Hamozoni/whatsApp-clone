import { MdAddIcCall } from "react-icons/md";
import { Search_form } from "../ui/search_form";
import { useContext, useEffect, useState } from "react";
import { User_context } from "../../contexts/user.context";
import { Call_card } from "../chat/call_card";
import { IoVideocam,IoKeypad } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

export const Calls =  ()=> {

    const {calls,user} = useContext(User_context);

    const [search_value,set_search_value] = useState('');


    const handle_search =()=> {

    };

   const time = (time)=> {
    return new Date(time).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'});
    }

    return (
        <div className="h-dvh flex">
            <div className="flex-1 border-r border-cyan-950">
                <header className="p-3">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold">Calls</h4>
                        <button>
                            <MdAddIcCall size={24} />
                        </button>
                    </div>
                    <Search_form 
                        set_value={search_value}
                        search_value={set_search_value} 
                        handle_search={handle_search}
                        />
                </header>
                <div className="p-3">
                    <h6>Recent</h6>
                    <div className="">
                        {
                            calls?.map((call)=> (
                                <div key={call?._id} className="flex gap-2 my-1 cursor-pointer rounded-md p-2 hover:bg-[#48505e] w-full">
                                    <img 
                                        className="w-11 h-11 rounded-full"
                                        src={call?.caller?._id === user?._id ?  call?.callee?.profile_picture
                                            : call?.caller?.rofile_picture} 
                                        alt='avatar' />
                                    <div className=" flex-1">
                                        <div className="flex items-center justify-between">
                                           <h6>{call?.caller?._id === user?._id ?  call?.callee?.name : call?.caller?.name}</h6>
                                           <span className="text-xs text-[#667781]">
                                               {time(call?.createdAt || call?.updatedAt)}
                                            </span>
                                        </div>
                                        <Call_card call={call} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex-2 flex items-center justify-center">
                <div className="flex items-center justify-center gap-5">
                    <button className="p-4 rounded-xl border border-cyan-950">
                        <IoVideocam size={40}/>
                    </button>
                    <button className="p-4 rounded-xl border border-cyan-950">
                        <AiOutlineVideoCameraAdd size={40} />
                    </button>
                    <button className="p-4 rounded-xl border border-cyan-950">
                        <IoKeypad size={40}/>
                    </button>
                </div>
            </div>
        </div>
    )
}