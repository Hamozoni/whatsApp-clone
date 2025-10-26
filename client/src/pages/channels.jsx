import { useState } from "react";
import { GrChannel } from "react-icons/gr";
import {SearchInput} from '../components/ui/searchInput';
import {RoundedBtn} from "../components/ui/roundedBtn";
import { IoMdAdd } from "react-icons/io";
import { NewChannelForm } from "../components/channels//newChannelForm";
import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { MainCard } from "../components/shared/mainCard";
import { CloseModel } from "../components/modal/closeModel";
import { CreateChannelAlert } from "../components/modal/createChannelAlert";

export const Channels = () => {

    const [text,setText] = useState('');
    const {channels} = useContext(UserContext);

    const [isCreateChannel,setIsCreateChannel] = useState(false);
    const [isNewChannel,setIsNewChannel] = useState(false);



    return (
        <div className="flex gap-1 h-full flex-1 overflow-y-auto">
            {
                isNewChannel ? (
                    <NewChannelForm setIsNewChannel={setIsNewChannel} />
                ) : (
                    <div className="p-3 flex-1 min-w-[380px] w-full md:w-[380px] max-w-full flex flex-col  max-h-full rounded-lg bg-p">
                        <header className='border-b border-b-gray-800 pb-3'>
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-lg font-bold">Channels</h5>
                                <RoundedBtn Icon={IoMdAdd} onClick={()=> setIsCreateChannel(true)} />
                            </div>
                            <SearchInput handleSearch={()=> ''} text={text} setText={setText} />
                        </header>

                    <div className="py-3 flex-1 max-w-full overflow-y-auto">
                            {
                                channels?.map(({_id,name,avatar,createdAt})=> (
                                    <MainCard 
                                        avatarUrl={avatar.url}
                                        key={_id}
                                        name={name}
                                        time={createdAt}
                                        >
                                    <span className="text-gray-400 text-sm">You ctreated this channel</span>
                                    </MainCard>
                                ))
                            }

                        </div>


                    </div>
                )
            }
            
            <div className="hidden bg-s  rounded-lg md:flex flex-2 items-center justify-center flex-col gap-5">
                <GrChannel size={48} className="text-gray-400" />
                <h3 className='text-3xl'>
                    Discover channels
                </h3>
                <p className="text-center max-w-[400px] text-gray-400">
                    Entertainment, sports, news, lifestyle, people and more. Follow the channels that interest you
                </p>
            </div>

            {
            isCreateChannel && (
                <>
                <CloseModel setCloseModel={setIsCreateChannel} />
                <CreateChannelAlert 
                    setIsCreateChannel={setIsCreateChannel}
                    setIsNewChannel={setIsNewChannel}
                    />
                </>
            ) 
            }
        </div>
    )
}