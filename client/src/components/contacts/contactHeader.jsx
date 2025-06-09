import { FaArrowLeftLong } from "react-icons/fa6";

export const ContactHeader = ({children,title,set_backword})=> {
    return (
        <header className="px-3 py-5 sticky top-0 bg-[#111b21] hide_model">
            <div className="mb-6 flex items-center gap-6 hide_model">
                <button className=" cursor-pointer hide_model" onClick={()=> set_backword(false)}>

                    <FaArrowLeftLong size={22} />
                </button>
                <h4>{title}</h4>
            </div>
            {children}
        </header>
    )
}