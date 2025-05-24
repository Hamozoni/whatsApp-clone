import { ProfileForm } from "../ui/ProfileForm";
import { PiUserCircleFill } from "react-icons/pi";


export const Profile = ()=> {
    return (
        <div className="flex h-dvh flex-1">
            <div className="min-w-[350px] md:max-w-[380px] p-4  border-r border-cyan-950">
                <h5 className="text-xl mb-3">Profile</h5>
                <ProfileForm />
            </div>
            <div className="hidden md:flex flex-2 flex-col p-4 justify-center items-center gap-5 text-center">
                <PiUserCircleFill size={60} />
                <h6 className="text-4xl">Profile</h6>
            </div>
        </div>
    )
}