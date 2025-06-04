import { User_context } from "../../contexts/user.context";
import { useContext } from "react";

 
export const NavbarIcon = ({text,Icon})=> {

    const {active_navbar,set_active_navbar} = useContext(User_context);

    return (
        <button 
            onClick={()=> set_active_navbar(text)} 
            className={`relative flex justify-center items-center px-3 py-2 rounded-md hover:bg-[#394b55] cursor-pointer ${active_navbar === text && 'bg-[#394b55]'}`}>
            <Icon size={20} className={`${active_navbar === text ? 'text-emerald-400' :'text-[#f7f8fa]'}`}/>
            {
                active_navbar === text && 
                <div className="absolute  bottom-[-2px] left-[10%] w-[80%] h-[4px] bg-emerald-400 rounded-full"></div>
            }
        </button>
    )
    };
