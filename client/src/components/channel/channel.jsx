import { GrChannel } from "react-icons/gr";

export const Channel = () => {
    return (
        <div className="flex h-dvh">
            <div className="p-3 flex-1 border-r border-r-gray-800 flex flex-col min-w-[350px] md:max-w-[380px] ">
                <header className='border-b border-b-black'>
                    <h5 className="text-lg font-bold mb-4">Settings</h5>
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