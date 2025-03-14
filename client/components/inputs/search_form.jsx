import { BiSearchAlt2 } from "react-icons/bi"

export const Search_form = ({value,set_value,handle_search})=> {


    const handle_submit = (e)=> {
        e.preventDefault();

        if(value.length > 2) {
            handle_search()
        }

    }
    return (
        <form onSubmit={handle_submit} className="flex items-center bg-[#222e35] p-2 rounded-md">
            <button className="cursor-pointer px-2">
                <BiSearchAlt2 size={20} />
            </button>
            <input
                value={value}
                type="text" 
                placeholder="search"
                className="w-full focus:outline-0"
                onChange={e=> set_value(e.target.value)}
            />
        </form>
    )
}