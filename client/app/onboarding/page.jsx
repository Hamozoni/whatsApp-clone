"use client";

import { Auth_context } from "@/components/auth/context";
import { Loading } from "@/components/loading";
import { useContext, useEffect } from "react";
import { useState } from 'react';
import { Input } from '@/components/inputs/input';
import { Phone_input } from "@/components/inputs/phone_input";
import { ImFilePicture } from "react-icons/im";

export default function OnboardingForm() {


    const { user,is_loading } = useContext(Auth_context);
    
    const [avatarPreview, setAvatarPreview] = useState('');
    const [name, set_name] = useState('');
    const [phone, set_phone] = useState('');
    const [email, set_email] = useState('');
    const [about, set_about] = useState('');
    
    
    useEffect(()=> {
      if(!user && !is_loading) {
        redirect('/signin');
      }
      if(user && !is_loading) {
        setAvatarPreview(user?.photoURL);
        set_name(user?.displayName);
        set_email(user?.email)
      }
    },[user,is_loading]);
  
    if(is_loading) {
      return (
        <Loading />
      )
    }

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <form className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative inline-block">
              <img
                src={avatarPreview || '/placeholder-avatar.jpg'}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer hover:bg-green-600">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <ImFilePicture size={24}/>
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
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Complete
          </button>
        </form>
      </div>
    </div>
  );
}