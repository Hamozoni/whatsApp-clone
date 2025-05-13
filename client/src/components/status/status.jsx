import { useContext, useState } from "react"
import { User_context } from "../../contexts/user.context";
import { GrFormAdd } from "react-icons/gr";
import { Update_status_model } from "./update_status_model";
import { Close_model } from "../ui/close_model";
import { Text_status } from "./text_status";
import { Status_card } from "./status_card";
import { Avatar } from "../ui/avatar";


export const Status = ()=> {

    const {user,status} = useContext(User_context);
    const [is_update,set_is_update] = useState(false);
    const [status_type,set_status_type] = useState(null);
    const [file,set_file] = useState(null);

    console.log(status)

    return (
        <div className="flex h-dvh">
             {
                status_type === 'text' &&
                <Text_status set_status_type={set_status_type} />
             }
            <div className=" p-3 flex-1 border-r border-cyan-950">
                <header className="relative h-fit">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold mb-3">Status</h4>
                        <button onClick={()=> set_is_update(!is_update)} className="rounded-full border border-white">
                            <GrFormAdd size={20}/>
                        </button>
                    </div>
                    <div 
                        onClick={()=> set_is_update(!is_update)} 
                        className="flex gap-2 cursor-pointer"
                        >
                        <div className="relative">
                            <Avatar size="lg" user_photo={user?.profile_picture} />
                            <button className=" absolute right-0 bottom-0 rounded-full border border-cyan-950 bg-emerald-500">
                                <GrFormAdd />
                            </button>
                        </div>
                        <div className="">
                            <h5 className="m-0">My status</h5>
                            <span className="text-xs">Click to add status update</span>
                        </div>
                    </div>
                    {
                        is_update && 
                        <>
                            <Close_model set_model={set_is_update} />
                            <Update_status_model set_file={set_file} set_status_type={set_status_type}/>

                        </>
                    
                    }

                </header>
                <div className="">
                    <div className="py-3">
                        {
                            status?.map((st)=> (
                                <Status_card length={st.length} key={st[0]?._id} status={st} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-2"></div>
        </div>
    )
}