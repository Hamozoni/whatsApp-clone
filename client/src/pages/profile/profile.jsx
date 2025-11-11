import { ProfileForm } from "../../components/ui/ProfileForm";
import { PiUserCircleFill } from "react-icons/pi";
import { RoundedBtn } from "../../components/ui/roundedBtn";
import { MdArrowBack } from "react-icons/md";


export const Profile = ({setActivePage = null})=> {
    return (
        <div className="flex gap-1 h-full flex-1 overflow-y-auto">
            <div className="p-3 w-full min-w-[380px] md:w-[380px] max-w-full rounded-lg bg-p overflow-y-auto">
                <div className="flex gap-3 items-center mb-3">
                    {
                        setActivePage && 
                        <RoundedBtn 
                            onClick={()=> setActivePage('main')} 
                            Icon={MdArrowBack} />
                    }
                   <h5 className="text-xl">Profile</h5>
                </div>
                <ProfileForm />
            </div>
            {
                !setActivePage && (
                    <div className="hidden text-gray-400 md:flex flex-2 flex-col p-4 justify-center items-center gap-5 text-center bg-s rounded-lg">
                        <PiUserCircleFill size={60} />
                        <h6 className="text-4xl">Profile</h6>
                    </div>
                )
            }
        </div>
    )
}