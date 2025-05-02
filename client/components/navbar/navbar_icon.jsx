import { User_context } from "@/contexts/user.context";
import { useContext } from "react";

 
export const Navbar_icon = ({text,Icon})=> {

    const {active_navbar,set_active_navbar} = useContext(User_context);

    return (
        <button 
            onClick={()=> set_active_navbar(text)} 
            className={`relative flex justify-center items-center px-3 py-2 rounded-md hover:bg-[#394b55] cursor-pointer ${active_navbar === text && 'bg-[#394b55]'}`}>
            <Icon size={20} className={`${active_navbar === text ? 'text-emerald-400' :'text-[#f7f8fa]'}`}/>
            {
                active_navbar === text && 
                <div className="absolute top-[6px] left-[-2px] w-[4px] h-[26px] bg-emerald-400 rounded-full"></div>
            }
            <div className=""></div>
        </button>
    )
    };
