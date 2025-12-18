import { FaArrowLeftLong } from "react-icons/fa6";

export const ContactHeader = ({children,title,setIsContcatPage})=> {
    return (
        <header className="px-3 py-5 sticky top-0 bg-[#111b21]">
            <div className="mb-6 flex items-center gap-6">
                <button 
                    className=" cursor-pointer" 
                    onClick={()=> setIsContcatPage(false)}
                    >
                    <FaArrowLeftLong size={22} />
                </button>
                <h4>{title}</h4>
            </div>
            {children}
        </header>
    )
}