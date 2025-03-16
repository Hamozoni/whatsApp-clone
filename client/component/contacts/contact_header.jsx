import { FaArrowLeftLong } from "react-icons/fa6";
import { Search_form } from "../inputs/search_form";

export const Contact_header = ({title,set_backword,search_value,set_search_value,handle_search})=> {
    return (
        <header className="px-3 py-5 sticky top-0 bg-[#111b21]">
            <div className="mb-6 flex items-center gap-6">
                <button className=" cursor-pointer" onClick={()=> set_backword(false)}>

                    <FaArrowLeftLong size={22} />
                </button>
                <h4>{title}</h4>
            </div>
            <Search_form  
                value={search_value} 
                set_value={set_search_value} 
                handle_search={handle_search}
            />
        </header>
    )
}