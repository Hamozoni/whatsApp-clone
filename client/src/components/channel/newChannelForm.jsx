import { IoArrowBack } from "react-icons/io5"
import { RoundedBtn } from "../ui/roundedBtn"
import { useState } from "react"
import { EmojiBtn } from "../ui/emojiBtn";
import { ImFilePicture } from "react-icons/im";
import {Avatar} from "../ui/avatar"

export const NewChannelForm = ({setIsNewChannel})=> {

    const [photo,setPhoto] = useState(null);
    const [name,setName] = useState('');
    const [about,setAbout] = useState('');

      const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };

    return (
        <div className="p-3 flex-1 border-r border-r-gray-800 flex flex-col min-w-[350px] md:max-w-[380px]">
            <header className="flex gap-3 items-center mb-5">
                <RoundedBtn Icon={IoArrowBack} onClick={()=> setIsNewChannel(false)} />
                <h5 className="text-lg">new channel</h5>
            </header>
            <div className="">
                <form action="w-full">

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative inline-block">
                            <Avatar size="2xl" user_photo={photo || '/channelAvatar.jpg'} />
                            <label className="absolute opacity-0 hover:opacity-100 bottom-0 right-0 text-white rounded-full w-full h-full p-2 cursor-pointer flex flex-col items-center justify-center bg-[#00000059]">
                            <ImFilePicture size={24}/>
                            <span className="text-xs">change Avatar</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhoto}
                                className="hidden"
                            />
                            </label>
                        </div>
                    </div>
                    <div className="my-10 flex items-center pb-5 border-b border-b-gray-400 ">
                        <input
                            className="w-full flex-1"
                            onChange={e=> setName(e.target.value)} 
                            type="text" 
                            placeholder="Channel name"
                            />
                        <EmojiBtn setText={setName} />
                    </div>
                    <div className="">
                            <textarea 
                                 className="w-full h-[150px]"
                                placeholder="Describe your channel. Include information to help people understand what your channel is about." 
                                onChange={e=> setAbout(e.target.value)} 
                                id="channelAbout"/>
                    </div>
                </form>
            </div>
        </div>
    )
}