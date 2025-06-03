import { IoArrowBack } from "react-icons/io5"
import { RoundedBtn } from "../ui/roundedBtn"

export const NewChannelForm = ({setIsNewChannel})=> {
    return (
        <div className="p-3 flex-1 border-r border-r-gray-800 flex flex-col min-w-[350px] md:max-w-[380px]">
            <header className="flex gap-3 items-center mb-5">
                <RoundedBtn Icon={IoArrowBack} onClick={()=> setIsNewChannel(false)} />
                <h5 className="text-lg">new channel</h5>
            </header>
        </div>
    )
}