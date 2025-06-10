import { IconTextBtn } from "../ui/iconTextBtn";
import {IoDocumentTextOutline } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Header } from "./header";


export const Account = ({setActivePage})=> {
    return (
        <>
            <Header title='Account' setActivePage={()=> setActivePage('main')} />
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
}