
export const IconTextBtn = ({Icon,text,onClick})=> {
    return (
        <button 
            className="flex items-center gap-4 my-1 px-3 capitalize rounded-lg border border-transparent hover:border-[#3b535c] hover:bg-[#1d2c31] w-full" 
            onClick={onClick}>
             <Icon size={24} /> 
             <h6 className="py-3 border-b border-b-[#3b535c] flex-1 text-start text-gray-300 text-sm">
                {text}
              </h6>
        </button>
    )
}