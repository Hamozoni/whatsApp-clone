import { ProfileForm } from "../ui/ProfileForm";
import { PiUserCircleFill } from "react-icons/pi";
import { RoundedBtn } from "../ui/roundedBtn";
import { MdArrowBack } from "react-icons/md";


export const Profile = ({setActivePage = null})=> {
    return (
        <div className="flex h-dvh flex-1">
            <div className="min-w-[350px] md:max-w-[380px] p-4  border-r border-cyan-950">
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
                    <div className="hidden md:flex flex-2 flex-col p-4 justify-center items-center gap-5 text-center">
                        <PiUserCircleFill size={60} />
                        <h6 className="text-4xl">Profile</h6>
                    </div>
                )
            }
        </div>
    )
}