"use client";
import { User_context } from "@/contexts/context";
import { useContext } from "react";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Phone_input } from "@/components/ui/phone_input";
import { ImFilePicture } from "react-icons/im";
import { Submit_btn } from "@/components/ui/submit_btn";

export default function OnboardingForm() {


    const { user } = useContext(User_context);
    const [avatar, set_avatar] = useState(user?.profile_picture);
    const [name, set_name] = useState(user?.name);
    const [phone, set_phone] = useState(user?.phone);
    const [email, set_email] = useState(user?.email);
    const [about, set_about] = useState(null);
    
    

  const handle_vatar = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set_avatar(reader?.result);
        console.log(reader)
      };
      reader.readAsDataURL(file);
    }
  };

  const handle_submit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="min-h-screen bg-[#111b21] text-[#f7f8fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 shadow-lg shadow-[#29343b77] p-3 bg-[#131e25] h-fit rounded-md md:p-8">
        <form className="space-y-4" onSubmit={handle_submit}>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative inline-block">
              <img
                src={avatar || '/placeholder_avatar.jpg'}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
              />
              <ImFilePicture size={24}/>
              <label className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer hover:bg-green-600">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handle_vatar}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Full Name */}
          <Input 
              label='Full Name' 
              value={name} 
              set_value={set_name} 
              type='text'
              required={true} 
              placeholder="John Doe"
            />

          {/* Email */}
          <Input 
              label='Email Address' 
              value={email} 
              set_value={set_email} 
              type='email'
              required={true} 
              placeholder="john@example.com"
              disabled={true}
            />

          {/* Phone Number */}
          <Phone_input value={phone} set_value={set_phone}/>

          {/* about */}
          <Input 
              label='About' 
              value={about} 
              set_value={set_about} 
              type='text'
              required={false} 
             placeholder="about you..   (optional)"
            />
          {/* Submit Button */}
          <Submit_btn text='save' is_loading={false} />
        </form>
      </div>
    </div>
  );
}