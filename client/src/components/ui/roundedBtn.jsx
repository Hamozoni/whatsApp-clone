
export const RoundedBtn = ({Icon,onClick,isActive = false})=> {
    return (
        <button 
            onClick={onClick} 
            className={`${isActive ? 'bg-[#838080c4]' : 'hover:bg-[#42414191]'} w-fit  rounded-full p-2`}
            >
            <Icon size={26} />
        </button>
    )
}