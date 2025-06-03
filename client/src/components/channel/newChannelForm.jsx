import { IoArrowBack } from "react-icons/io5"
import { RoundedBtn } from "../ui/roundedBtn"
import { useState } from "react"
import { EmojiBtn } from "../ui/emojiBtn";

export const NewChannelForm = ({setIsNewChannel})=> {

    const [photo,setPhoto] = useState(null);
    const [name,setName] = useState('');
    const [about,setAbout] = useState('');

    return (
        <div className="p-3 flex-1 border-r border-r-gray-800 flex flex-col min-w-[350px] md:max-w-[380px]">
            <header className="flex gap-3 items-center mb-5">
                <RoundedBtn Icon={IoArrowBack} onClick={()=> setIsNewChannel(false)} />
                <h5 className="text-lg">new channel</h5>
            </header>
            <div className="">
                <form action="w-full">
                    <div className="">
                        <label htmlFor="channelPhoto">
                            <input onChange={e=> setPhoto(e.target.files[0])} type="file"  id="channelPhoto" accept="image/*" hidden />
                        </label>
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