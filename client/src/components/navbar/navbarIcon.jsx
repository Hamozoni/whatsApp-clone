import { UserContext } from "../../contexts/user.context";
import { useContext } from "react";

 
export const NavbarIcon = ({text,Icon})=> {

    const {activeNavbar,setActiveNavbar} = useContext(UserContext);


    return (

       <button onClick={()=> setActiveNavbar(text)} className={`${activeNavbar === text ? 'text-emerald-400' :'text-[#f7f8fa]'} flex flex-col items-center justify-center`}>
            <div
                className={`relative flex justify-center items-center p-1 rounded-md hover:opacity-85 cursor-pointer`}>
                <Icon 
                    size={24} 
                    />
                {
                    activeNavbar === text && 
                    <div className="absolute  bottom-[-2px] left-[25%] w-[50%] h-[2px] bg-emerald-400 rounded-full"></div>
                }
            </div>
            <span className=" md:hidden">
                {text}
            </span>
        </button>
    )
    };
