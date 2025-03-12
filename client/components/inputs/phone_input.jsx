import 'react-international-phone/style.css';
import { PhoneInput } from "react-international-phone"

export const Phone_input = ({value,set_value})=> {
    return (
        <div className="">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
            </label>
            
            <div className="">
                <PhoneInput
                    defaultCountry="sa"
                    value={value}
                    onChange={value=> set_value(value)}
                    inputClassName="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
            </div>
        </div>
    )
}