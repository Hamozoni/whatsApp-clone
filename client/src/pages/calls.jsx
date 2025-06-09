import { MdAddIcCall } from "react-icons/md";
import { useContext, useState } from "react";
import { User_context } from "../contexts/user.context";
import { IoVideocam,IoKeypad } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { SearchInput } from "../components/ui/searchInput";
import { CallCard } from "../components/calls/callCard";

export const Calls =  ()=> {

    const {calls,user} = useContext(User_context);

    const [searchText,setSearchText] = useState('');


    const handle_search =()=> {

    };

    return (
        <div className="h-dvh flex">
            <div className="flex-1 border-r border-r-[#213036] min-w-[350px] w-full md:w-[350px] max-w-full">
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
                    <h6 className="text-gray-400 font-medium mb-5">
                        Recent
                    </h6>
                    <div className="">
                        {
                            calls?.map((call)=> (
                                <CallCard 
                                    key={call?._id} 
                                    call={call} 
                                    userId={user?._id} 
                                    />
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