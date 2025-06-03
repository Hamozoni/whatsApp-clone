import { useState } from "react";
import { GrChannel } from "react-icons/gr";
import {SearchInput} from '../ui/searchInput';
import {RoundedBtn} from "../ui/roundedBtn";
import { IoMdAdd } from "react-icons/io";
import { CreateChannelAlert } from "./createChannelAlert";
import { Close_model } from "../ui/close_model";

export const Channel = () => {

    const [text,setText] = useState('');

    const [isCreateChannel,setIsCreateChannel] = useState(false)

    const handleCreateChannel = ()=> [

    ]

    return (
        <div className="flex h-dvh">
            {
               isCreateChannel && (
                <>
                 <Close_model set_model={setIsCreateChannel} />
                 <CreateChannelAlert />
                </>
               ) 
            }
            <div className="p-3 flex-1 border-r border-r-gray-800 flex flex-col min-w-[350px] md:max-w-[380px] ">
                <header className='border-b border-b-black'>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold">Channels</h5>
                        <RoundedBtn Icon={IoMdAdd} onClick={()=> setIsCreateChannel(true)} />
                    </div>
                    <SearchInput handleSearch={()=> ''} text={text} setText={setText} />
                </header>


            </div>
            <div className="hidden md:flex flex-2 items-center justify-center flex-col gap-5">
                <GrChannel size={48} className="text-gray-400" />
                <h3 className='text-3xl'>
                    Discover channels
                </h3>
                <p className="text-center max-w-[400px] text-gray-400">
                    Entertainment, sports, news, lifestyle, people and more. Follow the channels that interest you
                </p>
            </div>
        </div>
    )
}