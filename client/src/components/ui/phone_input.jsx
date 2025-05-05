import 'react-international-phone/style.css';
import { PhoneInput } from "react-international-phone"

export const Phone_input = ({value,set_value})=> {
    return (
        <div className="my-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
            </label>
            
            <div className="">
                <PhoneInput
                    defaultCountry="sa"
                    value={value || ''}
                    onChange={value=> set_value(value)}
                    inputClassName="w-full px-3 py-2 border border-[#283741] rounded-lg focus:outline-none  focus:border-[#467b9c]"
                />
            </div>
        </div>
    )
}