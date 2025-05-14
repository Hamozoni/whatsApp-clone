
export const RoundedBtn = ({Icon,onClick})=> {
    return (
        <button 
            onClick={onClick} 
            className="hover:bg-[#00000046] rounded-full p-2"
            >
            <Icon size={26} />
        </button>
    )
}