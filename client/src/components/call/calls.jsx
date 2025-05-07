import { MdAddIcCall } from "react-icons/md";
import { Search_form } from "../ui/search_form";
import { useContext, useState } from "react";
import { User_context } from "../../contexts/user.context";
import { Call_card } from "../chat/call_card";
export const Calls =  ()=> {

    const {calls,user} = useContext(User_context);

    const [search_value,set_search_value] = useState('');

    const handle_search =()=> {

    }

    return (
        <div className="">
            <header className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl">Calls</h4>
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
                            <div key={call?._id} className="flex">
                                <img 
                                    className="w-11 h-11 rounded-full"
                                    src={call?.caller?._id === user?._id ?  call?.callee?.profile_picture
                                         : call?.caller?.rofile_picture} 
                                    alt='avatar' />
                                <Call_card call={call} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}