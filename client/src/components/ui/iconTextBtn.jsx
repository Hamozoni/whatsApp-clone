
export const IconTextBtn = ({Icon,text,onClick})=> {
    return (
        <button className="flex items-center w-full rounded-full gap-4 my-1 p-3 hover:bg-neutral-800" onClick={onClick}>
             <Icon size={24} /> {text}
        </button>
    )
}