import { ProfileForm } from "./components/ProfileForm";
import { PiUserCircleFill } from "react-icons/pi";
import { RoundedBtn } from "../../components/ui/roundedBtn";
import { MdArrowBack } from "react-icons/md";
import { useNavigate} from "react-router-dom";

const Profile = ({isSettingPage = false})=> {
    const navigate = useNavigate()
    return (
        <div className="flex gap-1 h-full flex-1 overflow-y-auto">
            <div className="p-3 w-full min-w-[380px] md:w-[380px] max-w-full rounded-lg bg-p overflow-y-auto">
                <div className="flex gap-3 items-center mb-3">
                    {
                        isSettingPage && 
                        <RoundedBtn 
                            onClick={()=> navigate('/settings')} 
                            Icon={MdArrowBack} />
                    }
                   <h5 className="text-xl">Profile</h5>
                </div>
                <ProfileForm />
            </div>
            {
                !isSettingPage && (
                    <div className="hidden text-gray-400 md:flex flex-2 flex-col p-4 justify-center items-center gap-5 text-center bg-s rounded-lg">
                        <PiUserCircleFill size={60} />
                        <h6 className="text-4xl">Profile</h6>
                    </div>
                )
            }
        </div>
    )
};

export default Profile;