import { GrChannel } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";
import { FaEyeSlash } from "react-icons/fa6";
import { SiSpringsecurity } from "react-icons/si";

export const CreateChannelAlert = ( )=> {
    return (
        <div className="bg-gray-950 rounded-md fixed left-1/2 top-1/2 -translate-1/2 z-50 p-5">

            <header className="mb-5">
                <div className="mx-auto mb-5 w-fit rounded-full bg-emerald-900 p-4">
                   <GrChannel size={80} className="" />

                </div>
                <h4 className=" capitalize text-xl text-center font-bold">create a channel to reach unlimted followers</h4>
            </header>
            <div className="">
                <div className="flex items-center gap-3">
                    <div className="">
                        <GiWorld size={28} />
                    </div>
                    <div className="">
                        <h5 className=" text-lg font-medium">Anyone can discover your channel</h5>
                        <p className=" text-md font-medium text-gray-400">Channels are poblic, so anyone can find them and 30 dayes of history</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 my-5">
                    <div className="">
                        <FaEyeSlash size={28}/>
                    </div>
                    <div className="">
                        <h5 className=" text-lg font-medium">Anyone can discover your channel</h5>
                        <p className=" text-md font-medium text-gray-400">"Followers can’t see your phone number, profile picture or name, but other admins can</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="">
                        <SiSpringsecurity size={28} />
                    </div>
                    <div className="">
                        <h5 className=" text-lg font-medium">You’re responsible for your channel</h5>
                        <p className=" text-md font-medium text-gray-400">Your channel needs to follow our guidelines and is reviewed against them</p>
                    </div>
                </div>
            </div>
            <footer className="mt-4">
                <div className="flex items-center gap-2 justify-end">
                    <button>
                        close
                    </button>
                    <button>
                        continue
                    </button>

                </div>
            </footer>
        </div>
    )
}