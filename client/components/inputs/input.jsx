
export const Input = ({label,type,value,set_value,required,placeholder})=> {


    return (
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#f7f8fa] mb-1">
                {label}
            </label>
            <input
                type={type}
                id={label}
                required={required}
                value={value || ''}
                onChange={(e)=> set_value(e.target.value)}
                className="w-full px-3 py-2 border border-[#283741] rounded-lg focus:outline-none  focus:border-[#467b9c]"
                placeholder={placeholder}
                />
        </div>
    )
}