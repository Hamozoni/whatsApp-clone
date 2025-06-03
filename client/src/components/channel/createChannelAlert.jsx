import { GrChannel } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";
import { FaEyeSlash } from "react-icons/fa6";
import { SiSpringsecurity } from "react-icons/si";
import { Avatar } from "../ui/avatar";

export const CreateChannelAlert = ( {setIsCreateChannel,setIsNewChannel} )=> {

    const handleContinue = ()=> {
        setIsNewChannel(true);
        setIsCreateChannel(false)
    }
    return (
        <div className="bg-gray-950 rounded-md fixed left-1/2 top-1/2 -translate-1/2 z-50 p-5">

            <header className="mb-5">
                <div className="mx-auto mb-5 w-fit rounded-full bg-emerald-900 p-4">
                   <Avatar size="2xl" user_photo={'/channelAvatar.jpg'} />
                </div>
                <h4 className=" capitalize text-xl text-center font-bold">create a channel to reach unlimted followers</h4>
            </header>
            <div className="">
                <div className="flex items-center gap-5">
                    <div className="">
                        <GiWorld size={28} />
                    </div>
                    <div className="">
                        <h5 className=" text-lg font-medium">Anyone can discover your channel</h5>
                        <p className=" text-md font-medium text-gray-400">Channels are poblic, so anyone can find them and 30 dayes of history</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 my-5">
                    <div className="">
                        <FaEyeSlash size={28}/>
                    </div>
                    <div className="">
                        <h5 className=" text-lg font-medium">Anyone can discover your channel</h5>
                        <p className=" text-md font-medium text-gray-400">"Followers can’t see your phone number, profile picture or name, but other admins can</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="">
                        <SiSpringsecurity size={28} />
                    </div>
                    <div className="">
                        <h5 className=" text-lg font-medium">You’re responsible for your channel</h5>
                        <p className=" text-md font-medium text-gray-400">Your channel needs to follow our guidelines and is reviewed against them</p>
                    </div>
                </div>
            </div>
            <footer className="mt-8">
                <div className="flex items-center gap-5 justify-end">
                    <button onClick={()=> setIsCreateChannel(false)} className="text-md">
                        close
                    </button>
                    <button onClick={handleContinue} className=" rounded-full text-md bg-emerald-950 py-1 px-6">
                        continue
                    </button>

                </div>
            </footer>
        </div>
    )
}