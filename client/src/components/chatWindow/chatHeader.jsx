
// import { GoSearch } from "react-icons/go"
// import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoCallOutline,IoVideocamOutline  } from "react-icons/io5";
import { useContext } from "react";
import { CallContext } from "../../contexts/call.context";
import { UserContext } from "../../contexts/user.context";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export const ChatHeader = ({receiver})=> {

    const {
        setCallStatus,
        setCallee,
        setCaller,
        setCallType
    } = useContext(CallContext);
    
    const {user} = useContext(UserContext);

    const navigate = useNavigate()

    const startCall = (type)=> {
        setCallStatus('call');
        setCallee(receiver);
        const userInfo = {
            _id: user?._id,
            name: user?.name,
            profile_picture: user?.profile_picture
        }
        setCaller(userInfo);
        setCallType(type);
    };


    return (
        <div className="p-3 bg-p text-[#f7f8fa] flex items-center rounded-lg">
            <div className="flex items-center gap-2 pr-2">
                {/* <GoSearch className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#afb3b9] hide_model " /> */}
                <MdArrowBackIos 
                    onClick={()=> navigate('/chats')} 
                    className="h-6 w-6 text-[#f7f8fa] cursor-pointer hover:text-[#bcc0c7]"
                    />
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={receiver?.profile_picture} alt="Profile" className="w-10 h-10 object-cover" />
            </div>
            <div className="ml-4 flex-1 ">
                <h2 className="font-semibold text-[#f7f8fa]">
                   {receiver?.name}
                </h2>
                <p className="text-sm font-light text-[#f7f8fa] ">
                {receiver?.in_online ? 'online' : 'offline'}
                </p>
            </div>
            <div className="flex gap-5 items-center">
                <div className="flex items-center bg-s rounded-md">
                    <button onClick={()=> startCall('AUDIO')}  className="flex justify-center items-center p-2 rounded-md hover:bg-[#00a884] cursor-pointer ">
                        <IoCallOutline size={18} className='text-[#f7f8fa]'/>
                    </button>
                    <div className="w-[1px] min-w[1px] h-[20px] min-h-[20px] bg-[#ffffff]">  </div>
                    <button onClick={()=> startCall('VIDEO')} className="flex justify-center items-center p-2 rounded-md hover:bg-[#00a884] cursor-pointer">
                        <IoVideocamOutline size={18} className='text-[#f7f8fa]'/>
                    </button>
                </div>
            </div>
        </div>
    )
}