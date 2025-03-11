"use client";
import { Auth_context } from "@/components/auth/context";
import { Loading } from "@/components/loading";
import { useContext, useEffect } from "react";
import { useState } from 'react';

export default function OnboardingForm() {


    const { user,is_loading } = useContext(Auth_context);
    
    const [avatarPreview, setAvatarPreview] = useState('');
    const [name, set_name] = useState('');
    const [email, set_email] = useState('');
    const [status, setStatus] = useState('active');
    
    
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
        <form className="space-y-6">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-2.465a.5.5 0 01-.354-.146l-1.414-1.414A2 2 0 0010.343 4H8.343a2 2 0 00-1.414.586L5.465 6H4z" />
                  <path d="M10 9a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              required
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="(123) 456-7890"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

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