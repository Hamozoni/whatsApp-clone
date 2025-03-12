
export const Input = ({label,type,value,set_value,required,placeholder})=> {


    return (
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                id={label}
                required={required}
                value={value}
                disabled={type === 'email'}
                onChange={(e)=> set_value(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={placeholder}
                />
        </div>
    )
}