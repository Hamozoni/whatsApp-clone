import { useContext, useState } from "react";
import { User_context } from "../../contexts/user.context";
import { ImFilePicture } from "react-icons/im";
import { MdOutlineEdit,MdCheck } from "react-icons/md";
import { Avatar } from "./avatar";


export const ProfileForm = ()=> {

        const { user } = useContext(User_context);
        const [userAvatarURL, setUserAvatarURL] = useState(user?.profile_picture);
        const [name, setName] = useState(user?.name);
        const [isEditName, setIsEditName] = useState(false);
        const [about, setAbout] = useState(null);

 const handleChangeAvatar = (e) => {
    const file = e.target.files?.[0];
    const src = URL.createObjectURL(file);
    setUserAvatarURL(src)
  };




    return (
        <div className="w-full" >
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

          {/*Name */}
          <div className="">
              <h6>Your name</h6>
              <div className={`${isEditName ? ' border-b-amber-300' : 'border-b-transparent'} border-b flex justify-center items-center`}>
                  <input

                    className="w-full flex-1"
                    type="text" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)}
                    />
                    <div className="">
                        {
                          isEditName ? 
                        <button onClick={()=> setIsEditName(false)}>
                            <MdCheck size={28} />
                        </button> :
                        <button onClick={()=> setIsEditName(true)}>
                            <MdOutlineEdit size={28} />
                        </button> 
                        }
                    </div>
              </div>
              <span 
                  className="text-sm text-gray-400">
                    This is not your username or PIN. This name will be visible to your WhatsApp contacts.
              </span>
          </div>
        </div>
    )
}