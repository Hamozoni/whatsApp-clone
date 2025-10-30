import { useLocation, useNavigate } from "react-router-dom";

 
export const NavbarIcon = ({text,Icon})=> {


    const {pathname} = useLocation();

    const navigate  = useNavigate()


    return (
       <button 
            onClick={()=> navigate(text)} 
            className={`${pathname.replace('/','') === text || text === 'chats' && pathname.startsWith('/chats') || text === 'chats' && pathname === '/' ? 'text-emerald-400' :'text-[#f7f8fa]'} flex flex-col items-center justify-center`}>
            <div
                className={`relative flex justify-center items-center p-1 rounded-md hover:opacity-85 cursor-pointer`}>
                <Icon 
                    size={24} 
                    />
                {
                    pathname === text && 
                    <div className="absolute hidden md:flex bottom-[-2px] left-[25%] w-[50%] h-[2px] bg-emerald-400 rounded-full"></div>
                }
            </div>
        </button>
    );
};
