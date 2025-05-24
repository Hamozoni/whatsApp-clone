import { IconTextBtn } from "../ui/iconTextBtn";
import { RoundedBtn } from "../ui/roundedBtn";
import { IoArrowBack,IoDocumentTextOutline } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";


export const Account = ({setActivePage})=> {
    return (
        <div className="">
            <header className="flex gap-3 items-center mb-5">
                <RoundedBtn Icon={IoArrowBack} onClick={()=> setActivePage('main')} />
                <h5 className="text-xl">Account</h5>
            </header>
            <div className="">
                <IconTextBtn Icon={MdSecurity} text='Security notification' onClick={()=> ''}/>
                <IconTextBtn Icon={IoDocumentTextOutline} text='Requist account info'  onClick={()=> ''}/>
                <IconTextBtn Icon={FaRegCircleQuestion} text='How to delete my account'  onClick={()=> ''}/>
            </div>
        </div>
    )
}