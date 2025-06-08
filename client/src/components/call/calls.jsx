import { MdAddIcCall } from "react-icons/md";
import { useContext, useState } from "react";
import { User_context } from "../../contexts/user.context";
import { Call_card } from "../chats/call_card";
import { IoVideocam,IoKeypad } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Avatar } from "../ui/avatar";
import { SearchInput } from "../ui/searchInput";
import { timeFormat } from "../../lib/timeFormat";

export const Calls =  ()=> {

    const {calls,user} = useContext(User_context);

    const [searchText,setSearchText] = useState('');


    const handle_search =()=> {

    };

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
                    <SearchInput 
                        setText={searchText}
                         text={setSearchText} 
                        handleSearch={handle_search}
                        />
                </header>
                <div className="p-3">
                    <h6>Recent</h6>
                    <div className="">
                        {
                            calls?.map((call)=> (
                                <div key={call?._id} className="flex gap-2 my-1 cursor-pointer rounded-md p-2 hover:bg-[#48505e] w-full">
                                    <Avatar size="lg" user_photo={call?.profile_picture}/>
                                    <div className=" flex-1">
                                        <div className="flex items-center justify-between">
                                           <h6>{call?.caller?._id === user?._id ?  call?.callee?.name : call?.caller?.name}</h6>
                                           <span className="text-xs text-[#667781]">
                                               {timeFormat(call?.createdAt || call?.updatedAt)}
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
            <div className="flex-2 hidden md:flex items-center justify-center">
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