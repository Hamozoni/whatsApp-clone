import { useContext, useState } from "react";
import { User_context } from "../../contexts/user.context";
import { ImFilePicture } from "react-icons/im";
import { Input } from "./input";
import { Phone_input } from "./phone_input";
import { Submit_btn } from "./submit_btn";
import { Avatar } from "./avatar";


export const ProfileForm = ()=> {

        const { user } = useContext(User_context);
        const [userAvatarURL, setUserAvatarURL] = useState(user?.profile_picture);
        const [name, set_name] = useState(user?.name);
        const [phone, set_phone] = useState(user?.phone);
        const [email, set_email] = useState(user?.email);
        const [about, set_about] = useState(null);

 const handleChangeAvatar = (e) => {
    const file = e.target.files?.[0];
    const src = URL.createObjectURL(file);
    setUserAvatarURL(src)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }


    return (
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative inline-block">
              <Avatar size="2xl" user_photo={userAvatarURL || '/placeholder_avatar.jpg'} />
              <label className="absolute opacity-0 hover:opacity-100 bottom-0 right-0 text-white rounded-full w-full h-full p-2 cursor-pointer flex flex-col items-center justify-center bg-[#00000059]">
              <ImFilePicture size={24}/>
              <span className="text-xs">change Avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangeAvatar}
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
    )
}