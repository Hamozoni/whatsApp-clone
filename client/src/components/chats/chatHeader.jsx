import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"
import { RiChatNewLine } from "react-icons/ri"
import { SearchInput } from "../../components/ui/searchInput"


export const ChatHeader = (
    {
        setIsContcatPage,
        searchText,
        setSearchText
    })=> {
        
    return (
        <header className="p-3">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">
                    Chats
                </h3>
                <div className="flex items-center">
                    <button
                    onClick={()=> setIsContcatPage(true)} 
                        className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer"
                        >
                        <RiChatNewLine size={18} className='text-[#f7f8fa]'/>
                    </button>
                    <div className="flex justify-center items-center p-2 rounded-md hover:bg-[#394b55] cursor-pointer">
                        <PiDotsThreeOutlineVerticalFill 
                            size={18} 
                            className='text-[#f7f8fa]'
                            />
                    </div>    
                </div>
            </div>
            <SearchInput 
                text={searchText} 
                setText={setSearchText} 
                handle_search={()=> ''} 
                />
                <hr className="my-5 text-[#213036]" />
        </header>
    )
}