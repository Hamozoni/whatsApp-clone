import { useState } from "react";
import { FaRegEye,FaEyeSlash } from "react-icons/fa";

export const Input = ({label,type,value,set_value,required,placeholder,disabled=false})=> {

    const [input_type,set_input_type] = useState(type);

    return (
        <div className="relative my-4">
            <label htmlFor="name" className="block text-sm font-medium text-[#f7f8fa] mb-1">
                {label}
            </label>
            <input
                type={input_type}
                id={label}
                required={required}
                value={value || ''}
                onChange={(e)=> set_value(e.target.value)}
                className="w-full px-3 py-2 border border-[#283741] rounded-full focus:outline-none  focus:border-[#467b9c]"
                placeholder={placeholder}
                disabled={disabled}
                />
                {
                    type === 'password' &&
                    <div 
                        onClick={()=> set_input_type(input_type === 'text' ? 'password' : 'text')} 
                        className="absolute bottom-0 -translate-y-[13px] right-4 cursor-pointer"
                        >
                        {
                            input_type === 'text' ? <FaRegEye /> : <FaEyeSlash />
                        }
                    </div>
                }
        </div>
    )
}