
export const Switch = ({title,desc,setIsOn,isOn = true})=> {
    return (
     <section className=" cursor-pointer" onClick={()=> setIsOn(!isOn)}>
        <h6 className="text-ms">{title}</h6>
        <div className="flex justify-between gap-2">
            <p className="text-xs  text-gray-400">
                {desc}
            </p>
            <div className={`${isOn ? "border-emerald-600":"border-gray-300"} h-5 min-w-11 border rounded-full relative cursor-pointer`}>
                <span className={`${isOn ? 'right-[1px] bg-emerald-400' : 'left-[1px] bg-gray-600'} absolute top-[1px] rounded-full w-4 h-4 `}></span>
            </div>
        </div>
    </section>
    )
}