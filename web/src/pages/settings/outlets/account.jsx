import { IconTextBtn } from "../../../components/ui/iconTextBtn";
import {IoDocumentTextOutline } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Header } from "../components/header";


const Account = ()=> {
    return (
        <>
            <Header title='Account' />
            <div className="p-3">
                <IconTextBtn 
                    Icon={MdSecurity} 
                    text='Security notification' 
                    onClick={()=> ''}
                    />
                <IconTextBtn 
                    Icon={IoDocumentTextOutline} 
                    text='Requist account info'  
                    onClick={()=> ''}
                    />
                <IconTextBtn 
                    Icon={FaRegCircleQuestion} 
                    text='How to delete my account'  
                    onClick={()=> ''}
                    />
            </div>
        </>
    )
};

export default Account;