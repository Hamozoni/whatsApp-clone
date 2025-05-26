
export const IconTextBtn = ({Icon,text,onClick})=> {
    return (
        <button 
            className="flex items-center w-full gap-4 my-1 p-4 capitalize rounded-md  hover:bg-gray-800" 
            onClick={onClick}>
             <Icon size={24} /> {text}
        </button>
    )
}