
"use client";

import {PhoneInput} from 'react-international-phone';
import { useState } from 'react';

export const Phone_input_with_countries = ()=> {

    const [phone,set_phone] = useState('');
    // const [selected_countery,set_selected_countery] = useState(null);



    return (
    <div className="">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
        </label>
        
        <div className="flex items-center gap-2 w-full">
            <PhoneInput
                defaultCountry="sa"
                value={phone}
                onChange={value=> set_phone(value)}
                inputClassName="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
        </div>
    </div>
    )
}