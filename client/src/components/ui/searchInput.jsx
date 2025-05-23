import { BiSearchAlt2 } from "react-icons/bi"

export const SearchInput = ({text,setText,handleSearch})=> {


    const handleSubmit = (e)=> {
        e.preventDefault();

        if(text.length > 2) {
            handleSearch()
        }

    }
    return (
        <form onSubmit={handleSubmit} className="flex items-center bg-[#222e35] p-2 rounded-md">
            <button className="cursor-pointer px-2">
                <BiSearchAlt2 size={20} />
            </button>
            <input
                value={text}
                type="text" 
                placeholder="search"
                className="w-full focus:outline-0"
                onChange={e=> setText(e.target.value)}
            />
        </form>
    )
}